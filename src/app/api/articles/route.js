import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(
  process.cwd(),
  "src",
  "app",
  "utils",
  "data.json"
);
const imagesDir = path.join(process.cwd(), "public", "images", "articles");

// Helper functions
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function readArticles() {
  try {
    const fileData = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(dataFilePath, "[]");
      return [];
    }
    throw error;
  }
}

async function writeArticles(articles) {
  await fs.writeFile(dataFilePath, JSON.stringify(articles, null, 2));
}

// API Endpoints
export async function GET() {
  try {
    const articles = await readArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await ensureDirectoryExists(imagesDir);

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

    const articles = await readArticles();

    if (
      articles.some(
        (article) => article.articleNumber === Number(articleNumber)
      )
    ) {
      return NextResponse.json(
        { error: "Article number already exists" },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Handle image upload
    let imagePath = null;
    if (imageFile) {
      const timestamp = Date.now();
      const ext = imageFile.name.split(".").pop();
      const filename = `article-${timestamp}.${ext}`;
      imagePath = `/images/articles/${filename}`;

      const fileBuffer = await imageFile.arrayBuffer();
      await fs.writeFile(
        path.join(imagesDir, filename),
        Buffer.from(fileBuffer)
      );
    }

    // Create new article
    const newArticle = {
      id: articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1,
      articleNumber: Number(articleNumber),
      title,
      description: description || "",
      image: imagePath,
      createdAt: new Date().toISOString(),
    };

    articles.push(newArticle);
    await writeArticles(articles);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create article", details: error.message },
      { status: 500 }
    );
  }
}
