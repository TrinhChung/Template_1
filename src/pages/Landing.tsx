import { useEffect } from "react";
import { Banner, CategoriesSection, HomeCollectionSection } from "../components";

const Landing = () => {
    useEffect(() => {
          document.title = "Home"; // Set a static title for the search page
    }, []);
  return (
    <>
      <Banner />
      <HomeCollectionSection />
      <CategoriesSection />
      
    </>
  );
};
export default Landing;
