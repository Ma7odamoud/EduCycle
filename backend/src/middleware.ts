import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const origin = request.headers.get("origin");

  // Static allowed origins (local dev)
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    // Production frontend URL — set FRONTEND_URL in Vercel backend env vars
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  // Also allow any *.vercel.app origin dynamically
  const isVercelApp = origin ? /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) : false;
  const isAllowedOrigin = allowedOrigins.includes(origin || "") || isVercelApp;

  // Handle preflight OPTIONS requests for CORS
  if (request.method === "OPTIONS") {
    const headers = new Headers();
    
    if (isAllowedOrigin && origin) {
      headers.set("Access-Control-Allow-Origin", origin);
    }
    
    headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, cookie, x-csrf-token, set-cookie");
    headers.set("Access-Control-Allow-Credentials", "true");
    
    return new NextResponse(null, { status: 200, headers });
  }

  // All other requests proceed normally.
  // We attach the origin header so the backend knows where it came from
  const response = NextResponse.next();
  if (isAllowedOrigin && origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
