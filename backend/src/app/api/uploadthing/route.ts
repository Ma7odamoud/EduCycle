import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

// Export route handler for GET (upload URL generation) and POST (upload completion)
export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
