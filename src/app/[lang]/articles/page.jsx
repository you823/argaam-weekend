import React from "react";
import articlesData from "../../utils/data.json";
import ArticleCard from "../../../components/ArticleCard/ArticleCard.jsx";

const page = async ({ params }) => {
  const { lang } = await params;

  // Sort articles by article_number in ascending order
  // const sortedArticles = [...articlesData].sort((a, b) => {
  //   return a.article_number - b.article_number;
  // });
  return (
    <div className="articles-box">
      <div className="row">
        {articlesData.map((article) => (
          <div key={article.id} className="col-4 col-md-4 col-lg-4 mb-5">
            <ArticleCard data={article} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
