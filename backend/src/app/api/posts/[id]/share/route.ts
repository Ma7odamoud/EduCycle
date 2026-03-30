import { prisma } from "@/lib/prisma";
import { requireAuth, ok, notFound, serverError } from "@/lib/utils";

// ─── POST /api/posts/[id]/share ───────────────────────────────────────────────
// Protected — increment the share counter for a post
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!post) return notFound("Post not found");

    const updated = await prisma.post.update({
      where: { id: params.id },
      data: { shareCount: { increment: 1 } },
      select: { id: true, shareCount: true },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}
