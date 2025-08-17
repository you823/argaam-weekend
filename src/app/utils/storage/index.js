const isProduction = process.env.NODE_ENV === "production";

const storage = isProduction
  ? await import("./vercel-storage.js")
  : await import("./local-storage.js");

export const { saveArticle, getArticles, saveImage } = storage;
