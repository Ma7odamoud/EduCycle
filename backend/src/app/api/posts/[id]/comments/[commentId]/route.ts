import { prisma } from "@/lib/prisma";
import {
  requireAuth,
  ok,
  forbidden,
  notFound,
  validationError,
  serverError,
} from "@/lib/utils";
import { z } from "zod";

const editCommentSchema = z.object({ content: z.string().min(1) });

// ─── DELETE /api/posts/[id]/comments/[commentId] ──────────────────────────────
// Protected — delete a comment; ONLY the author (or admin) can delete their comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
      select: { authorId: true, postId: true },
    });

    if (!comment) return notFound("Comment not found");
    if (comment.postId !== params.id) return notFound("Comment not found on this post");

    if (
      comment.authorId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return forbidden("You can only delete your own comments");
    }

    await prisma.comment.delete({ where: { id: params.commentId } });

    return ok({ message: "Comment deleted successfully" });
  } catch (error) {
    return serverError(error);
  }
}

// ─── PUT /api/posts/[id]/comments/[commentId] ─────────────────────────────────
// Protected — edit a comment; ONLY the author can edit their own comment
export async function PUT(
  request: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = editCommentSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
      select: { authorId: true, postId: true },
    });

    if (!comment) return notFound("Comment not found");
    if (comment.postId !== params.id) return notFound("Comment not found on this post");
    if (comment.authorId !== session.user.id) return forbidden("You can only edit your own comments");

    const updated = await prisma.comment.update({
      where: { id: params.commentId },
      data: { content: parsed.data.content },
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}
