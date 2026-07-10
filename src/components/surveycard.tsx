// import { Link } from "react-router-dom";
// import "../style/surveycard.css";

// export default function SurveyCard({ survey }) {
//   return (
//     <div className="survey-card">
//       <h3>{survey.title}</h3>

//       <p>{survey.description}</p>

//       <span>Category : {survey.category}</span>

//       <Link to={`/survey/${survey.id}`}>
//         <button>Take Survey</button>
//       </Link>
//     </div>
//   );
// }



// type Props = {
//   survey: {
//     id: number;
//     title: string;
//     description: string;
//     category: string;
//   };
//   onTakeSurvey: () => void;
// };

// export default function SurveyCard({
//   survey,
//   onTakeSurvey,
// }: Props) {
//   return (
//     <div className="survey-card">
//       <h2>{survey.title}</h2>
//       <p>{survey.description}</p>
//       <p>Category: {survey.category}</p>

//       <button onClick={onTakeSurvey}>
//         Take Survey
//       </button>
//     </div>
//   );
// }


import React from "react";
import { Users } from "lucide-react";
import DonutChart from "./chart";
import type { ChartSlice } from "./chart";
import "../style/surveycard.css";

const chartData: ChartSlice[] = [
  { label: "Option A", value: 30, percent: 30, color: "#2563eb" },
  { label: "Option B", value: 70, percent: 70, color: "#16a34a" },
];

const SurveyCard: React.FC = () => {
  const totalResponses = chartData.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <div className="surveycard">
      <h3 className="surveycard__title">Survey Results (Sample)</h3>

      <div className="surveycard__body">
        <DonutChart data={chartData} />

        <div className="surveycard__legend">
          {chartData.map((slice) => (
            <div key={slice.label} className="surveycard__legend-item">
              <span className="surveycard__dot" style={{ background: slice.color }} />
              <span className="surveycard__legend-label">{slice.label}</span>
              <span className="surveycard__legend-value" style={{ color: slice.color }}>
                {slice.value} ({slice.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="surveycard__responses">
        <span className="surveycard__responses-icon">
          <Users size={18} />
        </span>
        <div>
          <div className="surveycard__responses-label">Total Responses</div>
          <div className="surveycard__responses-value">{totalResponses}</div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;




