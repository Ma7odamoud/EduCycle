import { prisma } from "@/lib/prisma";
import { requireAuth, ok, created, validationError, serverError } from "@/lib/utils";
import { createProductSchema, productQuerySchema } from "@/schemas/product.schema";
import type { Prisma } from "@prisma/client";

// ─── GET /api/products ────────────────────────────────────────────────────────
// Public endpoint — list products with optional filters and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = productQuerySchema.safeParse({
      category: searchParams.get("category") ?? undefined,
      minPrice: searchParams.get("minPrice") ?? undefined,
      maxPrice: searchParams.get("maxPrice") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });
    if (!parsed.success) return validationError(parsed.error);

    const { category, minPrice, maxPrice, search, page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    // Build dynamic where clause
    const where: Prisma.ProductWhereInput = {};
    if (category) where.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          seller: { select: { id: true, name: true, avatar: true, phoneNumber: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return ok({
      data: products,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return serverError(error);
  }
}

// ─── POST /api/products ───────────────────────────────────────────────────────
// Protected — creates a new product listing
// phoneNumber is automatically taken from the authenticated user's profile
export async function POST(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    // ── Auto-fetch seller's phone number ─────────────────────────────────────
    const seller = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phoneNumber: true },
    });

    const phoneNumber = seller?.phoneNumber ?? "";

    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        phoneNumber,
        sellerId: session.user.id,
      },
      include: {
        seller: { select: { id: true, name: true, avatar: true, phoneNumber: true } },
      },
    });

    return created(product);
  } catch (error) {
    return serverError(error);
  }
}
