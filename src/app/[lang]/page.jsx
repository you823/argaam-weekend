const HomePage = async ({ params }) => {
  const { lang } = await params;
  
  return (
    <div
      className="articles-box pt-3 d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <h1>{lang === "ar" ? "الصفحة الرئيسية" : "Home"}</h1>
    </div>
  );
};

export default HomePage;
