// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import { Download, Users } from "lucide-react";
// import { fetchOptionCounts, fetchSurveyById, optionCountsToCsv, downloadCsv } from "../utils/surveyApi";
// import type { OptionCount, Survey } from "../types/survey";
// import "../style/surveyResults.css";

// const BAR_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#0891b2"];

// const SurveyResultsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const surveyId = Number(id);

//   const [survey, setSurvey] = useState<Survey | null>(null);
//   const [counts, setCounts] = useState<OptionCount[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadResults = async () => {
//     try {
//       const [surveyData, countData] = await Promise.all([
//         fetchSurveyById(surveyId),
//         fetchOptionCounts(surveyId),
//       ]);
//       setSurvey(surveyData);
//       setCounts(countData);
//     } catch (err: any) {
//       setError(err.message || "Could not load results.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!surveyId) return;
//     setLoading(true);
//     loadResults();

//     // light polling so results feel "live" without websockets
//     const interval = setInterval(loadResults, 8000);
//     return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [surveyId]);

//   const totalResponses = counts.reduce((sum, c) => sum + Number(c.vote_count), 0);

//   const chartData = counts.map((c) => ({
//     name: c.choice_text,
//     votes: Number(c.vote_count),
//     percent: totalResponses ? Math.round((Number(c.vote_count) / totalResponses) * 100) : 0,
//   }));

//   const handleExport = () => {
//     if (!survey) return;
//     const csv = optionCountsToCsv(survey.question, counts);
//     downloadCsv(`survey-${survey.id}-results.csv`, csv);
//   };

//   if (loading) return <p className="survey-results__status">Loading results...</p>;
//   if (error) return <p className="survey-results__status survey-results__status--error">{error}</p>;
//   if (!survey) return null;

//   return (
//     <section className="survey-results">
//       <div className="survey-results__card">
//         <div className="survey-results__header">
//           <div>
//             <h2>{survey.question}</h2>
//             <p>Live results, updated automatically.</p>
//           </div>
//           <button className="survey-results__export" onClick={handleExport}>
//             <Download size={14} />
//             Export CSV
//           </button>
//         </div>

//         <div className="survey-results__chart">
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//               <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
//               <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
//               <Tooltip
//                 formatter={(value, _name, item) => [
//                   `${value} votes (${(item.payload as { percent: number }).percent}%)`,
//                   "Votes",
//                 ]}
//               />
//               <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
//                 {chartData.map((_, index) => (
//                   <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="survey-results__legend">
//           {chartData.map((item, index) => (
//             <div key={item.name} className="survey-results__legend-item">
//               <span
//                 className="survey-results__dot"
//                 style={{ background: BAR_COLORS[index % BAR_COLORS.length] }}
//               />
//               <span className="survey-results__legend-label">{item.name}</span>
//               <span className="survey-results__legend-value">
//                 {item.votes} ({item.percent}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="survey-results__total">
//           <span className="survey-results__total-icon">
//             <Users size={18} />
//           </span>
//           <div>
//             <div className="survey-results__total-label">Total Responses</div>
//             <div className="survey-results__total-value">{totalResponses}</div>
//           </div>
//         </div>

//         <Link to="/surveys" className="survey-results__back-link">
//           &larr; Back to all surveys
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default SurveyResultsPage;



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Users } from "lucide-react";
import { fetchOptionCounts, fetchSurveyById, optionCountsToCsv, downloadCsv } from "../utils/surveyApi";
import type { OptionCount, Survey } from "../types/survey";
import "../style/surveyResults.css";

const BAR_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#0891b2"];

const SurveyResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const surveyId = Number(id);

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [counts, setCounts] = useState<OptionCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadResults = async () => {
    try {
      const [surveyData, countData] = await Promise.all([
        fetchSurveyById(surveyId),
        fetchOptionCounts(surveyId),
      ]);
      setSurvey(surveyData);
      setCounts(countData);
    } catch (err: any) {
      setError(err.message || "Could not load results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!surveyId) return;
    setLoading(true);
    loadResults();

    // light polling so results feel "live" without websockets
    const interval = setInterval(loadResults, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  const totalResponses = counts.reduce((sum, c) => sum + Number(c.vote_count), 0);

  const chartData = counts.map((c) => ({
    name: c.choice_text,
    votes: Number(c.vote_count),
    percent: totalResponses ? Math.round((Number(c.vote_count) / totalResponses) * 100) : 0,
  }));

  const handleExport = () => {
    if (!survey) return;
    const csv = optionCountsToCsv(survey.question, counts);
    downloadCsv(`survey-${survey.id}-results.csv`, csv);
  };

  if (loading) return <p className="survey-results__status">Loading results...</p>;
  if (error) return <p className="survey-results__status survey-results__status--error">{error}</p>;
  if (!survey) return null;

  return (
    <section className="survey-results">
      <div className="survey-results__card">
        <div className="survey-results__header">
          <div>
            <h2>{survey.question}</h2>
            <p>Live results, updated automatically.</p>
          </div>
          <button className="survey-results__export" onClick={handleExport}>
            <Download size={14} />
            Export CSV
          </button>
        </div>

        <div className="survey-results__chart">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip
                formatter={(value, _name, item) => [
                  `${value} votes (${(item.payload as { percent: number }).percent}%)`,
                  "Votes",
                ]}
              />
              <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="survey-results__legend">
          {chartData.map((item, index) => (
            <div key={item.name} className="survey-results__legend-item">
              <span
                className="survey-results__dot"
                style={{ background: BAR_COLORS[index % BAR_COLORS.length] }}
              />
              <span className="survey-results__legend-label">{item.name}</span>
              <span className="survey-results__legend-value">
                {item.votes} ({item.percent}%)
              </span>
            </div>
          ))}
        </div>

        <div className="survey-results__total">
          <span className="survey-results__total-icon">
            <Users size={18} />
          </span>
          <div>
            <div className="survey-results__total-label">Total Responses</div>
            <div className="survey-results__total-value">{totalResponses}</div>
          </div>
        </div>

        <Link to="/surveys" className="survey-results__back-link">
          &larr; Back to all surveys
        </Link>
      </div>
    </section>
  );
};

export default SurveyResultsPage;
