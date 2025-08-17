import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";

export async function saveArticle(article) {
  await kv.lpush("articles", JSON.stringify(article));
  return article;
}

export async function getArticles() {
  const articles = await kv.lrange("articles", 0, -1);
  return articles.map((article) => JSON.parse(article));
}

export async function saveImage(imageFile) {
  const filename = `article-${Date.now()}-${imageFile.name}`;
  const blob = await put(filename, imageFile, { access: "public" });
  return blob.url;
}
