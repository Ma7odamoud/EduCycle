import { prisma } from "@/lib/prisma";
import {
  requireAuth,
  ok,
  forbidden,
  notFound,
  validationError,
  serverError,
} from "@/lib/utils";
import { updatePostSchema } from "@/schemas/post.schema";

// ─── GET /api/posts/[id] ──────────────────────────────────────────────────────
// Public — get a single post with its author and nested comment preview
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true, likes: true } },
        comments: {
          where: { parentId: null }, // Only top-level comments
          take: 5,                   // Preview — paginated via dedicated endpoint
          orderBy: { createdAt: "desc" },
          include: {
            author: { select: { id: true, name: true, avatar: true } },
            _count: { select: { replies: true } },
          },
        },
      },
    });

    if (!post) return notFound("Post not found");
    return ok(post);
  } catch (error) {
    return serverError(error);
  }
}

// ─── PUT /api/posts/[id] ──────────────────────────────────────────────────────
// Protected — update a post; ONLY the author can edit their own post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    // ── Verify ownership via DB query ────────────────────────────────────────
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true },
    });
    if (!post) return notFound("Post not found");

    if (
      post.authorId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return forbidden("You can only edit your own posts");
    }

    const body = await request.json();
    const parsed = updatePostSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const updated = await prisma.post.update({
      where: { id: params.id },
      data: parsed.data,
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}

// ─── DELETE /api/posts/[id] ───────────────────────────────────────────────────
// Protected — hard-delete a post; ONLY the author (or admin) can delete
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(_request);
    if (error) return error;

    // ── Verify ownership via DB query ────────────────────────────────────────
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true },
    });
    if (!post) return notFound("Post not found");

    if (
      post.authorId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return forbidden("You can only delete your own posts");
    }

    // Cascade deletes Comments and Likes automatically (via schema onDelete: Cascade)
    await prisma.post.delete({ where: { id: params.id } });

    return ok({ message: "Post deleted successfully" });
  } catch (error) {
    return serverError(error);
  }
}
