import { NextResponse, NextRequest } from "next/server";
import { UTApi } from "uploadthing/server";
import { requireAuth, serverError } from "@/lib/utils";

const utapi = new UTApi();

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const response = await utapi.uploadFiles(files);
    
    const hasError = response.some(res => res.error);
    if (hasError) {
      console.error("UploadThing errors:", response.filter(r => r.error));
      return NextResponse.json({ error: "Failed to upload some images" }, { status: 500 });
    }

    const urls = response.map(res => res.data?.url);
    return NextResponse.json({ urls });
  } catch (err) {
    return serverError(err);
  }
}
