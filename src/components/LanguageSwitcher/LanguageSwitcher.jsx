"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// css files 
import "./LanguageSwitcher.css"

const LanguageSwitcher = ({ currentLang }) => {
  const pathname = usePathname();

  const switchLanguage = (newLang) => {
    setCookie("NEXT_LOCALE", newLang, { path: "/" });
  };

  const getNewPath = (newLang) => {
    if (!pathname) return `/${newLang}/articles`;

    const parts = pathname.split("/");
    parts[1] = newLang;
    return parts.join("/");
  };

  return (
    <div className="language-switcher d-flex align-items-center gap-3">
      <Link
        href={getNewPath("en")}
        onClick={() => switchLanguage("en")}
        className={currentLang === "en" ? "active-lang" : "disactive-lang"}
      >
        EN
      </Link>
      <Link
        href={getNewPath("ar")}
        onClick={() => switchLanguage("ar")}
        className={currentLang === "ar" ? "active-lang" : "disactive-lang"}
      >
        AR
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
