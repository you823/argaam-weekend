"use client";

import Link from "next/link";
import React from "react";

// css files
import "./Header.css";
import Image from "next/image";

// logo
import black_en_logo from "../../../public/images/logoEnBlack.png";
import black_ar_logo from "../../../public/images/logoArBlack.png";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

const Header = ({ lang }) => {
  const pathName = usePathname();

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href={`/${lang}`}>
          {
            lang === "ar" ? (
              <Image
                src={black_ar_logo}
                alt="Argaam Logo"
                width={250}
                height={50}
              />
            ) : (
              <Image
                src={black_en_logo}
                alt="Argaam Logo"
                width={250}
                height={50}
              />
            )
          }
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav mb-0 mb-lg-0 gap-4 ${lang === "ar" ? "me-auto" : "ms-auto"}`}>
            <li className="nav-item">
              <Link
                className={pathName === `/${lang}` ? "nav-link active" : "nav-link"}
                aria-current="page"
                href={`/${lang}`}
              >
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  pathName.startsWith(`/${lang}/articles`)
                    ? "nav-link active"
                    : "nav-link"
                }
                href={`/${lang}/articles`}
              >
                {lang === "ar" ? "المقالات" : "Articles"}
              </Link>
            </li>
            <LanguageSwitcher currentLang={lang} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
