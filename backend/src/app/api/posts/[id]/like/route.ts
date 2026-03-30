import { prisma } from "@/lib/prisma";
import { requireAuth, ok, serverError } from "@/lib/utils";

// ─── POST /api/posts/[id]/like ────────────────────────────────────────────────
// Protected — toggle like on a post (like if not liked, unlike if already liked)
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const userId = session.user.id;
    const postId = params.id;

    // Check if the user has already liked this post
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingLike) {
      // ── Unlike ─────────────────────────────────────────────────────────────
      await prisma.$transaction([
        prisma.like.delete({ where: { userId_postId: { userId, postId } } }),
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } },
        }),
      ]);
      return ok({ liked: false, message: "Post unliked" });
    } else {
      // ── Like ───────────────────────────────────────────────────────────────
      await prisma.$transaction([
        prisma.like.create({ data: { userId, postId } }),
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } },
        }),
      ]);
      return ok({ liked: true, message: "Post liked" });
    }
  } catch (error) {
    return serverError(error);
  }
}
