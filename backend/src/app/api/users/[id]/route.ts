import { prisma } from "@/lib/prisma";
import { ok, serverError, notFound } from "@/lib/utils";

// ─── GET /api/users/[id] ──────────────────────────────────────────────────────
// Public — returns a user's public profile for viewing on their profile page
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            products: true,
            posts: true,
          },
        },
      },
    });

    if (!user) return notFound("User not found");

    return ok(user);
  } catch (error) {
    return serverError(error);
  }
}
