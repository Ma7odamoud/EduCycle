import { prisma } from "@/lib/prisma";
import { requireAuth, ok, badRequest, forbidden, notFound, serverError } from "@/lib/utils";

// ─── PUT /api/friends/[friendshipId] ─────────────────────────────────────────
// Accept or reject a pending friend request
// Body: { action: "ACCEPTED" | "REJECTED" }
export async function PUT(
  request: Request,
  { params }: { params: { friendshipId: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const action = body?.action as string;

    if (action !== "ACCEPTED" && action !== "REJECTED") {
      return badRequest('action must be "ACCEPTED" or "REJECTED"');
    }

    const friendship = await prisma.friendship.findUnique({
      where: { id: params.friendshipId },
    });

    if (!friendship) return notFound("Friend request not found");

    // Only the receiver can accept/reject
    if (friendship.receiverId !== session.user.id) {
      return forbidden("You cannot respond to this friend request");
    }

    if (friendship.status !== "PENDING") {
      return badRequest("This request has already been responded to");
    }

    const updated = await prisma.friendship.update({
      where: { id: params.friendshipId },
      data: { status: action },
      include: {
        requester: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
      },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}

// ─── DELETE /api/friends/[friendshipId] ──────────────────────────────────────
// Unfriend — either user can delete the friendship
export async function DELETE(
  request: Request,
  { params }: { params: { friendshipId: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const friendship = await prisma.friendship.findUnique({
      where: { id: params.friendshipId },
    });

    if (!friendship) return notFound("Friendship not found");

    // Only one of the two users in the friendship can delete it
    if (
      friendship.requesterId !== session.user.id &&
      friendship.receiverId !== session.user.id
    ) {
      return forbidden("You are not part of this friendship");
    }

    await prisma.friendship.delete({ where: { id: params.friendshipId } });

    return ok({ message: "Friendship removed" });
  } catch (error) {
    return serverError(error);
  }
}
