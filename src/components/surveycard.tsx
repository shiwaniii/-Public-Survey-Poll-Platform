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



type Props = {
  survey: {
    id: number;
    title: string;
    description: string;
    category: string;
  };
  onTakeSurvey: () => void;
};

export default function SurveyCard({
  survey,
  onTakeSurvey,
}: Props) {
  return (
    <div className="survey-card">
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <p>Category: {survey.category}</p>

      <button onClick={onTakeSurvey}>
        Take Survey
      </button>
    </div>
  );
}