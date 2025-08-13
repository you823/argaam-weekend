import FormComp from "./Form.jsx";

const TestPage = async ({ params }) => {
  const { lang } = await params;
  return <FormComp lang={lang} />;
};

export default TestPage;
