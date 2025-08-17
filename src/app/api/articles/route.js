import { NextResponse } from "next/server";
import { saveArticle, getArticles, saveImage } from "@/utils/storage";

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const articleNumber = formData.get("articleNumber");
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    // Validation
    if (!articleNumber || isNaN(articleNumber)) {
      return NextResponse.json(
        { error: "Article number must be a valid number" },
        { status: 400 }
      );
    }

    // Handle image upload
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await saveImage(imageFile);
    }

    // Create and save article
    const newArticle = {
      id: Date.now(),
      articleNumber: Number(articleNumber),
      title,
      description: description || "",
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    await saveArticle(newArticle);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create article", details: error.message },
      { status: 500 }
    );
  }
}
