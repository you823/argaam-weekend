"use client";
import React from "react";
import "./ArticleCard.css";
import { formatDate, getTimeDifference } from "../../helpers/helpers";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArticleCard = ({ data, lang }) => {
  // Using useRouter to navigate to article details page
  const router = useRouter();
  const handleReadMore = (lang, articleId) => {
    router.push(`/${lang}/articles/${articleId}`);
  };


  // Render the article card
  if (!data) {
    return <div className="article-card">Loading...</div>;
  }

  return (
    <div className="article-card">
      <div className="article-img-container">
        <Image
          width={350}
          height={150}
          src={data.image}
          alt={data.title}
          className="article-img"
        />
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="article-meta">
          <span className="article-date">
            {formatDate(data.createdAt)}
          </span>
        </div>
        <span className="article-number">{data.articleNumber}</span>
      </div>

      <h2 className="article-heading">
        {lang === "en" ? data.title : data.title}
      </h2>
      <p className="article-desc">
        {lang === "en"
          ? data.description?.substring(0, 150)
          : data.description?.substring(0, 150)}
        ...
      </p>
      <div className="d-flex align-items-center justify-content-end">
        {lang === "en" ? (
          <button
            onClick={() => handleReadMore(lang, data.id)}
            className="article-btn group flex items-center"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="ms-2 bi bi-chevron-double-right transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => handleReadMore(lang, data.id)}
            className="article-btn group flex items-center"
          >
            المزيد
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="me-2 bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
