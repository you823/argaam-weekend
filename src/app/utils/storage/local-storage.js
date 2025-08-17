import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "tmp");
const DATA_FILE = path.join(DATA_DIR, "articles.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, "[]");
    } else {
      throw error;
    }
  }
}

export async function saveArticle(article) {
  await ensureDataFile();
  const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  data.push(article);
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  return article;
}

export async function getArticles() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(data);
}

export async function saveImage(imageFile) {
  const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `article-${Date.now()}-${imageFile.name}`;
  const filePath = path.join(UPLOAD_DIR, filename);
  const buffer = await imageFile.arrayBuffer();

  await fs.writeFile(filePath, Buffer.from(buffer));
  return `/uploads/${filename}`;
}
