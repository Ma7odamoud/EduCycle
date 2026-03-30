import { prisma } from "@/lib/prisma";
import {
  requireAuth,
  ok,
  created,
  notFound,
  validationError,
  serverError,
} from "@/lib/utils";
import { createCommentSchema } from "@/schemas/post.schema";

// ─── GET /api/posts/[id]/comments ─────────────────────────────────────────────
// Public — returns threaded top-level comments with nested replies for a post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20", 10));
    const skip = (page - 1) * limit;

    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!post) return notFound("Post not found");

    const [comments, total] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {
          postId: params.id,
          parentId: null, // Only top-level comments
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          // Eagerly load one level of replies
          replies: {
            orderBy: { createdAt: "asc" },
            include: {
              author: { select: { id: true, name: true, avatar: true } },
              _count: { select: { replies: true } }, // Indicate if deeper nesting exists
            },
          },
          _count: { select: { replies: true } },
        },
      }),
      prisma.comment.count({ where: { postId: params.id, parentId: null } }),
    ]);

    return ok({
      data: comments,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return serverError(error);
  }
}

// ─── POST /api/posts/[id]/comments ────────────────────────────────────────────
// Protected — add a top-level comment or reply to a specific comment (via parentId)
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = createCommentSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { content, parentId } = parsed.data;

    // Validate that the parentId belongs to the same post (prevents comment injection)
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
        select: { postId: true },
      });
      if (!parentComment || parentComment.postId !== params.id) {
        return notFound("Parent comment not found on this post");
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        parentId,
        postId: params.id,
        authorId: session.user.id,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        _count: { select: { replies: true } },
      },
    });

    return created(comment);
  } catch (error) {
    return serverError(error);
  }
}
