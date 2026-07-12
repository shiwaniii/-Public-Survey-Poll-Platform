
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/homePage";
import PollSurvey from "./components/pollsurvey";
import Login from "./pages/loginPage";
import Signup from "./pages/signupPage";
import Dashboard from "./pages/dashboard";
import SurveyListPage from "./pages/SurveyListPage";
import SurveyDetailPage from "./pages/SurveyDetailPage";
import SurveyResultsPage from "./pages/SurveyResultsPage";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import EditSurveyPage from "./pages/EditSurveyPage";
import AboutPage from "./pages/aboutPage";
import { ProtectedRoute } from "./components/protected-route";
import "./App.css";

// import Hero from "./components/hero";
// import SurveyForm from "./form/surveyform";

import "./App.css";
import Question from "./components/question";
// import Chart from "./components/chart";

import AdminPage from "./components/admin";



const App: React.FC = () => {
  return (
    <> 
   
    <div className="app">
   <Navbar />
   
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/take-survey" element={<ProtectedRoute><PollSurvey /></ProtectedRoute>} />
          <Route path="/surveys" element={<ProtectedRoute><SurveyListPage /></ProtectedRoute>} />
          <Route path="/surveys/:id" element={<ProtectedRoute><SurveyDetailPage /> </ProtectedRoute>} />
          <Route path="/surveys/:id/results" element={<ProtectedRoute><SurveyResultsPage /></ProtectedRoute>} />
          <Route path="/surveys/:id/edit" element={<ProtectedRoute><EditSurveyPage /></ProtectedRoute>} />
          <Route path="/create-survey" element={<ProtectedRoute><CreateSurveyPage /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       
        <Route path="/Question" element={<ProtectedRoute><Question /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="*" element={<h1>404 not found check your url</h1>} />
          
      </Routes>
</main>
     
      <Footer />
    </div>
  </>
   );
};

export default App;