import { HeaderSection, FooterSection } from "./components";

const GetPage = ({ Page }) => {
  return (
    <div id="app">
      <HeaderSection />
      <div id="wrap">
        <Page />
      </div>
      <FooterSection />
    </div>
  );
};

export default GetPage;
