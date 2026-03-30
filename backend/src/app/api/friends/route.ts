import { prisma } from "@/lib/prisma";
import { requireAuth, ok, serverError } from "@/lib/utils";

// ─── GET /api/friends ─────────────────────────────────────────────────────────
// Returns the list of accepted friends for the current user,
// plus any pending incoming friend requests
export async function GET(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const userId = session.user.id;

    // Fetch accepted friendships where the user is either requester or receiver
    const acceptedFriendships = await prisma.friendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      include: {
        requester: { select: { id: true, name: true, avatar: true, bio: true } },
        receiver: { select: { id: true, name: true, avatar: true, bio: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Normalise: return the "other" user in each friendship
    const friends = acceptedFriendships.map((f) => ({
      friendshipId: f.id,
      friend: f.requesterId === userId ? f.receiver : f.requester,
      since: f.updatedAt,
    }));

    // Also return pending incoming requests (so the user can accept/reject)
    const pendingRequests = await prisma.friendship.findMany({
      where: { receiverId: userId, status: "PENDING" },
      include: {
        requester: { select: { id: true, name: true, avatar: true, bio: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return ok({ friends, pendingRequests });
  } catch (error) {
    return serverError(error);
  }
}
