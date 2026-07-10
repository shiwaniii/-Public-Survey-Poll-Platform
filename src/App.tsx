// import './App.css';
// import Navbar from './components/navbar';
// import Footer from './components/footer';
// import SurveyCard from './components/surveycard';
// import Question from './components/question';
// import Chart from './components/chart';
// import SurveyForm from './form/surveyform';

// function App() {
//   return (
//     <div className="app">
//       <Navbar />

//       <main className="main-content">
//         <SurveyCard
//           survey={{
//             id: 1,
//             title: "Customer Satisfaction Survey",
//             description:
//               "We value your feedback! Please take a few minutes to complete our customer satisfaction survey.",
//             category: "Customer Feedback",
//           }}
//         />

//         <Question
//           question="How satisfied are you with our service?"
//           options={[
//             "Very Satisfied",
//             "Satisfied",
//             "Neutral",
//             "Dissatisfied",
//             "Very Dissatisfied",
//           ]}
//           onAnswer={(answer) => console.log(answer)}
//         />

//         <Chart
//           data={[
//             { name: "Option A", value: 30 },
//             { name: "Option B", value: 70 },
//           ]} />
//           <SurveyForm onClose={() => console.log("Survey form closed")}
//         />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SurveyCard from "./components/surveycard";
import Question from "./components/question";
import Chart from "./components/chart";
import SurveyForm from "./form/surveyform";
import { Routes, Route } from "react-router-dom";

function App() {
  // ⭐ NEW: State to control popup
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <SurveyCard
          survey={{
            id: 1,
            title: "Customer Satisfaction Survey",
            description:
              "We value your feedback! Please take a few minutes to complete our customer satisfaction survey.",
            category: "Customer Feedback",
          }}
          // ⭐ NEW: Open form when button is clicked
          onTakeSurvey={() => setShowForm(true)}
        />

        <Question
          question="How satisfied are you with our service?"
          options={[
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied",
          ]}
          onAnswer={(answer) => console.log(answer)}
        />

        <Chart
          data={[
            { name: "Option A", value: 30 },
            { name: "Option B", value: 70 },
          ]}
        />

        {/* ⭐ NEW: Show form only when button is clicked */}
        {showForm && (
          <SurveyForm onClose={() => setShowForm(false)} />
        )}
      </main>
      <Routes>
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Question" element={<Question/>} />
        <Route path="/Chart" element={<Chart/>} />
        <Route path="/survey/:id" element={<SurveyForm/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
