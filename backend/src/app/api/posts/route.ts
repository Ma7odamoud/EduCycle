import { prisma } from "@/lib/prisma";
import { requireAuth, ok, created, validationError, serverError } from "@/lib/utils";
import { createPostSchema, feedQuerySchema } from "@/schemas/post.schema";

// ─── GET /api/posts ───────────────────────────────────────────────────────────
// Public — paginated community feed, optionally filtered by authorId
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const parsed = feedQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      authorId: searchParams.get("authorId") ?? undefined,
    });
    if (!parsed.success) return validationError(parsed.error);

    const { page, limit, authorId } = parsed.data;
    const skip = (page - 1) * limit;

    const where = authorId ? { authorId } : {};

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, name: true, avatar: true, role: true } },
          comments: {
            include: { author: { select: { id: true, name: true, avatar: true } } },
            orderBy: { createdAt: "asc" }
          },
          _count: { select: { comments: true } },
          ...(currentUserId ? { likes: { where: { userId: currentUserId }, select: { userId: true } } } : {})
        },
      }),
      prisma.post.count({ where }),
    ]);

    const formattedPosts = posts.map(post => {
      const { likes, ...rest } = post as any;
      return {
        ...rest,
        isLiked: likes ? likes.length > 0 : false
      };
    });

    return ok({
      data: formattedPosts,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return serverError(error);
  }
}

// ─── POST /api/posts ──────────────────────────────────────────────────────────
// Protected — create a new community post
export async function POST(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { content, mediaUrl } = parsed.data;

    const post = await prisma.post.create({
      data: {
        content,
        mediaUrl,
        authorId: session.user.id,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
    });

    return created(post);
  } catch (error) {
    return serverError(error);
  }
}
