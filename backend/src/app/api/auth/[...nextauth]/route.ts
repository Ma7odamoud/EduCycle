import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth v4 App Router handler
// Handles all /api/auth/* routes automatically
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
