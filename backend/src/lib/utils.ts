import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { ZodError } from "zod";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  details?: unknown;
}

// ─── Response Helpers ─────────────────────────────────────────────────────────

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function created<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json<ApiError>({ error: message, details }, { status: 400 });
}

export function unauthorized(message = "Authentication required") {
  return NextResponse.json<ApiError>({ error: message }, { status: 401 });
}

export function forbidden(message = "You are not allowed to perform this action") {
  return NextResponse.json<ApiError>({ error: message }, { status: 403 });
}

export function notFound(message = "Resource not found") {
  return NextResponse.json<ApiError>({ error: message }, { status: 404 });
}

export function serverError(error: unknown) {
  console.error("[Server Error]", error);
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return NextResponse.json<ApiError>({ error: message }, { status: 500 });
}

export function validationError(error: ZodError) {
  return NextResponse.json<ApiError>(
    { error: "Validation failed", details: error.flatten().fieldErrors },
    { status: 400 }
  );
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

/**
 * Gets the current JWT token and returns early with 401 if not authenticated.
 * Uses getToken() because the session strategy is 'jwt', NOT database sessions.
 *
 * Usage in route handlers:
 *   const { session, error } = await requireAuth(request);
 *   if (error) return error;
 */
export async function requireAuth(
  request: NextRequest | Request
): Promise<
  { session: { user: { id: string; name?: string; email?: string; role: string } }; error: null } |
  { session: null; error: NextResponse }
> {
  const token = await getToken({
    req: request as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.id) {
    return { session: null, error: unauthorized() };
  }

  return {
    session: {
      user: {
        id: token.id as string,
        name: token.name ?? undefined,
        email: token.email ?? undefined,
        role: (token.role as string) ?? "BUYER",
      },
    },
    error: null,
  };
}

/**
 * Checks if the session user has ADMIN role.
 */
export async function requireAdmin(
  request: NextRequest | Request
): Promise<
  { session: { user: { id: string; name?: string; email?: string; role: string } }; error: null } |
  { session: null; error: NextResponse }
> {
  const result = await requireAuth(request);
  if (result.error) return result;

  if (result.session.user.role !== "ADMIN") {
    return { session: null, error: forbidden("Admin access required") };
  }

  return result;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
