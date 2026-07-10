// // import React, { useState } from "react";
// // import {
// //   CheckCircle2,
// //   Clock,
// //   BarChart3,
// //   Tag,
// //   Users,
// //   Heart,
// // } from "lucide-react";

// // /**
// //  * SurveyHub landing page
// //  * Single-file React + TypeScript implementation using Tailwind CSS utility classes.
// //  * Drop into any Tailwind-enabled React project.
// //  */

// // type RatingOption = {
// //   id: string;
// //   label: string;
// //   colorClass: string; // tailwind border/text color for the radio ring
// // };

// // const ratingOptions: RatingOption[] = [
// //   { id: "very-satisfied", label: "Very Satisfied", colorClass: "border-blue-500" },
// //   { id: "satisfied", label: "Satisfied", colorClass: "border-green-500" },
// //   { id: "neutral", label: "Neutral", colorClass: "border-yellow-400" },
// //   { id: "dissatisfied", label: "Dissatisfied", colorClass: "border-orange-400" },
// //   { id: "very-dissatisfied", label: "Very Dissatisfied", colorClass: "border-red-500" },
// // ];

// // type LegendItem = {
// //   label: string;
// //   value: number;
// //   percent: number;
// //   colorClass: string; // text color for the legend dot + value
// //   dotClass: string; // bg color for the legend dot
// // };

// // const legendItems: LegendItem[] = [
// //   { label: "Option A", value: 30, percent: 30, colorClass: "text-blue-600", dotClass: "bg-blue-600" },
// //   { label: "Option B", value: 70, percent: 70, colorClass: "text-green-600", dotClass: "bg-green-600" },
// // ];

// // const NAV_LINKS = ["Home", "Dashboard", "Create Survey", "Login"];

// // const Navbar: React.FC = () => (
// //   <header className="w-full bg-white border-b border-slate-100">
// //     <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
// //       <div className="flex items-center gap-2">
// //         <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
// //           <CheckCircle2 size={18} strokeWidth={2.5} />
// //         </span>
// //         <span className="text-lg font-bold text-slate-800">SurveyHub</span>
// //       </div>

// //       <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
// //         {NAV_LINKS.map((link) => (
// //           <a key={link} href="#" className="hover:text-blue-600 transition-colors">
// //             {link}
// //           </a>
// //         ))}
// //       </nav>

// //       <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
// //         Take Survey
// //       </button>
// //     </div>
// //   </header>
// // );

// // const Hero: React.FC = () => (
// //   <section className="max-w-6xl mx-auto mt-6 px-6">
// //     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-400 px-8 py-14 md:px-14">
// //       <div className="relative z-10 max-w-xl">
// //         <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
// //           <Users size={14} />
// //           Customer Feedback
// //         </span>

// //         <h1 className="mt-5 text-3xl md:text-4xl font-extrabold leading-tight text-white">
// //           Customer Satisfaction Survey
// //         </h1>

// //         <p className="mt-4 text-sm md:text-base text-blue-100 max-w-md">
// //           We value your feedback! Please take a few minutes to complete our
// //           customer satisfaction survey.
// //         </p>

// //         <div className="mt-7 flex items-center gap-5">
// //           <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
// //             <CheckCircle2 size={16} />
// //             Take Survey
// //           </button>
// //           <span className="flex items-center gap-1.5 text-xs text-blue-100">
// //             <Clock size={14} />
// //             Takes ~ 3 minutes
// //           </span>
// //         </div>
// //       </div>

// //       {/* Decorative clipboard illustration */}
// //       <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 md:block">
// //         <ClipboardIllustration />
// //       </div>

// //       {/* Soft decorative blobs */}
// //       <div className="pointer-events-none absolute -right-10 -bottom-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
// //       <div className="pointer-events-none absolute right-24 top-0 grid grid-cols-4 gap-1.5 opacity-30">
// //         {Array.from({ length: 16 }).map((_, i) => (
// //           <span key={i} className="h-1 w-1 rounded-full bg-white" />
// //         ))}
// //       </div>
// //     </div>
// //   </section>
// // );

// // const ClipboardIllustration: React.FC = () => (
// //   <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
// //     <rect x="20" y="20" width="130" height="170" rx="14" fill="#EFF6FF" />
// //     <rect x="65" y="6" width="40" height="20" rx="6" fill="#1E3A8A" />
// //     <circle cx="85" cy="16" r="4" fill="#60A5FA" />

// //     {/* Star row 1 (checked) */}
// //     <rect x="38" y="46" width="14" height="14" rx="3" fill="#2563EB" />
// //     <path d="M41 53l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //     {[0, 1, 2, 3, 4].map((i) => (
// //       <path
// //         key={`s1-${i}`}
// //         d={`M${64 + i * 14} 53l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
// //         fill="#2563EB"
// //       />
// //     ))}

// //     {/* Star row 2 (unchecked, 4 stars) */}
// //     <rect x="38" y="76" width="14" height="14" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
// //     {[0, 1, 2, 3].map((i) => (
// //       <path
// //         key={`s2-${i}`}
// //         d={`M${64 + i * 14} 83l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
// //         fill="#93C5FD"
// //       />
// //     ))}

// //     {/* Star row 3 (unchecked, 3 stars) */}
// //     <rect x="38" y="106" width="14" height="14" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
// //     {[0, 1, 2].map((i) => (
// //       <path
// //         key={`s3-${i}`}
// //         d={`M${64 + i * 14} 113l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
// //         fill="#BFDBFE"
// //       />
// //     ))}

// //     {/* Text lines */}
// //     <rect x="38" y="140" width="70" height="5" rx="2.5" fill="#DBEAFE" />
// //     <rect x="38" y="152" width="50" height="5" rx="2.5" fill="#DBEAFE" />

// //     {/* Blue check badge */}
// //     <circle cx="140" cy="140" r="26" fill="#2563EB" stroke="white" strokeWidth="4" />
// //     <path d="M129 140l8 8 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );

// // const SurveyQuestionCard: React.FC = () => {
// //   const [selected, setSelected] = useState<string | null>(null);

// //   return (
// //     <div className="rounded-2xl bg-white p-7 shadow-sm border border-slate-100">
// //       <div className="flex items-center gap-3">
// //         <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
// //           <BarChart3 size={20} />
// //         </span>
// //         <h2 className="text-lg font-bold text-slate-800">
// //           How satisfied are you with our service?
// //         </h2>
// //       </div>

// //       <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
// //         {ratingOptions.map((option) => (
// //           <label
// //             key={option.id}
// //             className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
// //           >
// //             <span
// //               className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${option.colorClass}`}
// //             >
// //               {selected === option.id && (
// //                 <span className={`h-2 w-2 rounded-full ${option.colorClass.replace("border", "bg")}`} />
// //               )}
// //             </span>
// //             <input
// //               type="radio"
// //               name="satisfaction"
// //               value={option.id}
// //               className="sr-only"
// //               checked={selected === option.id}
// //               onChange={() => setSelected(option.id)}
// //             />
// //             {option.label}
// //           </label>
// //         ))}
// //       </div>

// //       <hr className="my-6 border-slate-100" />

// //       <div className="rounded-xl bg-slate-50 px-4 py-3">
// //         <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
// //           <Tag size={14} />
// //           Category
// //         </div>
// //         <div className="mt-1 text-sm font-semibold text-blue-600">Customer Feedback</div>
// //       </div>
// //     </div>
// //   );
// // };

// // const DonutChart: React.FC<{ items: LegendItem[] }> = ({ items }) => {
// //   const radius = 60;
// //   const circumference = 2 * Math.PI * radius;
// //   let cumulative = 0;

// //   const segmentColors: Record<string, string> = {
// //     "Option A": "#2563EB",
// //     "Option B": "#16A34A",
// //   };

// //   return (
// //     <svg width="150" height="150" viewBox="0 0 150 150">
// //       <g transform="rotate(-90 75 75)">
// //         {items.map((item) => {
// //           const dash = (item.percent / 100) * circumference;
// //           const offset = (cumulative / 100) * circumference;
// //           cumulative += item.percent;
// //           return (
// //             <circle
// //               key={item.label}
// //               cx="75"
// //               cy="75"
// //               r={radius}
// //               fill="none"
// //               stroke={segmentColors[item.label] ?? "#94A3B8"}
// //               strokeWidth="22"
// //               strokeDasharray={`${dash} ${circumference - dash}`}
// //               strokeDashoffset={-offset}
// //             />
// //           );
// //         })}
// //       </g>
// //       <circle cx="75" cy="75" r="38" fill="white" />
// //     </svg>
// //   );
// // };

// // const SurveyResultsCard: React.FC = () => {
// //   const totalResponses = legendItems.reduce((sum, item) => sum + item.value, 0);

// //   return (
// //     <div className="rounded-2xl bg-slate-50 p-7 border border-slate-100">
// //       <h3 className="text-sm font-bold text-slate-800">Survey Results (Sample)</h3>

// //       <div className="mt-5 flex items-center gap-8">
// //         <DonutChart items={legendItems} />

// //         <div className="flex flex-col gap-3">
// //           {legendItems.map((item) => (
// //             <div key={item.label} className="flex items-center gap-2 text-sm">
// //               <span className={`h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
// //               <span className="text-slate-600">{item.label}</span>
// //               <span className={`font-semibold ${item.colorClass}`}>
// //                 {item.value} ({item.percent}%)
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="mt-6 flex items-center gap-3 rounded-xl bg-white px-4 py-3 border border-slate-100">
// //         <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
// //           <Users size={18} />
// //         </span>
// //         <div>
// //           <div className="text-xs font-medium text-slate-400">Total Responses</div>
// //           <div className="text-sm font-bold text-slate-800">{totalResponses}</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const SurveySection: React.FC = () => (
// //   <section className="max-w-6xl mx-auto px-6 mt-6">
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
// //       <SurveyQuestionCard />
// //       <SurveyResultsCard />
// //     </div>
// //   </section>
// // );

// // const Footer: React.FC = () => (
// //   <footer className="mt-10 bg-slate-900 py-5">
// //     <div className="max-w-6xl mx-auto flex items-center justify-center gap-1.5 px-6 text-xs text-slate-300">
// //       <Heart size={12} className="text-blue-400" fill="currentColor" />
// //       © 2026 SurveyHub. All Rights Reserved.
// //     </div>
// //   </footer>
// // );

// // const App: React.FC = () => {
// //   return (
// //     <div className="min-h-screen bg-slate-50 font-sans antialiased">
// //       <Navbar />
// //       <Hero />
// //       <SurveySection />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;



import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SurveyForm from "./form/surveyform";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import "./App.css";
import Question from "./components/question";
import Chart from "./components/chart";
import PollSurvey from "./components/pollsurvey";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />

      <main className="app__main">
        <Hero />
        <SurveyForm />
        <PollSurvey />  
      </main>
      <Routes>
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Question" element={<Question/>} />
        {/* <Route path="/Chart" element={<Chart/>} /> */}
        <Route path="/survey/:id" element={<SurveyForm/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>

     

      <Footer />
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import Navbar from "./components/navbar";
// import Hero from "./components/hero";
// import SurveyForm from "./form/surveyform";
// import Footer from "./components/footer";
// import "./App.css";

// const App: React.FC = () => {
//   const [showSurvey, setShowSurvey] = useState(false);

//   return (
//     <div className="app">
//       <Navbar onTakeSurvey={() => setShowSurvey(true)} />

//       <main className="app__main">
//         <Hero onTakeSurvey={() => setShowSurvey(true)} />
//       </main>

//       {showSurvey && (
//         <div className="survey-modal">
//           <div className="survey-popup">
//             <SurveyForm />

//             <button
//               className="close-popup"
//               onClick={() => setShowSurvey(false)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default App;