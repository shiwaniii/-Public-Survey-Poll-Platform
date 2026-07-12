
import React from "react";
import Hero from "../components/hero";
// import SurveyForm from "../form/surveyform";
import RecentPollResults from "../components/RecentPollResults";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* <SurveyForm /> */}
      <RecentPollResults />
    </>
  );
};

export default HomePage;