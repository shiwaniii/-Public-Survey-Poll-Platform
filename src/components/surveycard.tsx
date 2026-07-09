import { Link } from "react-router-dom";
import "./SurveyCard.css";

export default function SurveyCard({ survey }) {
  return (
    <div className="survey-card">
      <h3>{survey.title}</h3>

      <p>{survey.description}</p>

      <span>Category : {survey.category}</span>

      <Link to={`/survey/${survey.id}`}>
        <button>Take Survey</button>
      </Link>
    </div>
  );
}