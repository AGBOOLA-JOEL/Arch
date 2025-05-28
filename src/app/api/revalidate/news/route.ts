// app/api/revalidate/news/route.ts
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret } = body;

    if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Revalidate the /news page
    revalidatePath("/news");
    revalidatePath("/");

    return new Response("Revalidated", { status: 200 });
  } catch (error) {
    return new Response("Error revalidating", { status: 500 });
  }
}
