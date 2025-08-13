import React from "react";
import articlesData from "../../../utils/data.json";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";

const page = async ({ params }) => {
  const { lang, articleId } = await params;

  const article = articlesData.find(
    (article) => parseInt(article.id) === parseInt(articleId)
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="articles-box pt-3">
      <BackBtn lang={lang} />
      <div className="image-wrapper">
        <Image
          src={article.image}
          alt={lang === "en" ? article.title : article.title}
          width={800}
          height={400}
          className="article-img"
          priority // Optional: if this is above-the-fold image
        />
        <h1 className="article-heading">
          {lang === "en" ? article.title : article.title}
        </h1>
      </div>
      <p className="fs-3 fw-bold">
        {lang === "en"
          ? article.description
          : article.description}
        ...
      </p>

      {/* Dynamic content based on language */}
      {/* <div
        className="article-content"
        dangerouslySetInnerHTML={{
          __html:
            lang === "en"
              ? article.article_data_en
              : article.article_data_ar || article.article_data_en, // Fallback to English if Arabic not available
        }}
      /> */}
    </div>
  );
};

export default page;
