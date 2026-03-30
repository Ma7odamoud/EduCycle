import { prisma } from "@/lib/prisma";
import { requireAuth, ok, created, badRequest, serverError } from "@/lib/utils";

// ─── POST /api/friends/request/[userId] ──────────────────────────────────────
// Sends a friend request from the current user to the target user
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const requesterId = session.user.id;
    const receiverId = params.userId;

    if (requesterId === receiverId) {
      return badRequest("You cannot send a friend request to yourself");
    }

    // Check if a friendship already exists in either direction
    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
    });

    if (existing) {
      if (existing.status === "ACCEPTED") return badRequest("You are already friends");
      if (existing.status === "PENDING") return badRequest("Friend request already sent");
      // If REJECTED, allow re-sending by updating the record
      if (existing.status === "REJECTED") {
        const updated = await prisma.friendship.update({
          where: { id: existing.id },
          data: { status: "PENDING", requesterId, receiverId },
        });
        return ok(updated);
      }
    }

    const friendship = await prisma.friendship.create({
      data: { requesterId, receiverId, status: "PENDING" },
    });

    return created(friendship);
  } catch (error) {
    return serverError(error);
  }
}
