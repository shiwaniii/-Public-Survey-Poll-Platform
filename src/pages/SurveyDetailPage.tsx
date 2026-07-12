// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { BarChart3, CheckCircle2 } from "lucide-react";
// import {
//   fetchSurveyById,
//   fetchOptionsForSurvey,
//   getUserVote,
//   submitVote,
// } from "../utils/surveyApi";
// import type { Survey, SurveyOption } from "../types/survey";
// import { useAuth } from "../context/AuthContext";
// import "../style/surveyDetail.css";

// const SurveyDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [survey, setSurvey] = useState<Survey | null>(null);
//   const [options, setOptions] = useState<SurveyOption[]>([]);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [alreadyVotedFor, setAlreadyVotedFor] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const surveyId = Number(id);

//   useEffect(() => {
//     if (!surveyId) return;

//     let mounted = true;
//     setLoading(true);

//     Promise.all([
//       fetchSurveyById(surveyId),
//       fetchOptionsForSurvey(surveyId),
//       user ? getUserVote(surveyId, user.id) : Promise.resolve(null),
//     ])
//       .then(([surveyData, optionsData, voteData]) => {
//         if (!mounted) return;
//         setSurvey(surveyData);
//         setOptions(optionsData);
//         if (voteData) setAlreadyVotedFor(voteData.option_id);
//       })
//       .catch((err) => {
//         if (mounted) setError(err.message || "Failed to load this survey.");
//       })
//       .finally(() => {
//         if (mounted) setLoading(false);
//       });

//     return () => {
//       mounted = false;
//     };
//   }, [surveyId, user]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     if (!selectedOption) {
//       setError("Please choose an option before submitting.");
//       return;
//     }

//     setSubmitting(true);
//     setError("");

//     try {
//       await submitVote(surveyId, selectedOption, user.id);
//       navigate(`/surveys/${surveyId}/results`);
//     } catch (err: any) {
//       setError(err.message || "Could not submit your vote. Have you already voted?");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p className="survey-detail__status">Loading...</p>;
//   if (error && !survey) return <p className="survey-detail__status survey-detail__status--error">{error}</p>;
//   if (!survey) return null;

//   return (
//     <section className="survey-detail">
//       <div className="survey-detail__card">
//         <div className="survey-detail__header">
//           <span className="survey-detail__icon">
//             <BarChart3 size={20} />
//           </span>
//           <div>
//             <h2>{survey.question}</h2>
//             {survey.description && <p>{survey.description}</p>}
//           </div>
//         </div>

//         {alreadyVotedFor ? (
//           <div className="survey-detail__voted">
//             <CheckCircle2 size={18} />
//             <span>
//               You've already voted on this poll.{" "}
//               <Link to={`/surveys/${surveyId}/results`}>View live results</Link>
//             </span>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="survey-detail__form">
//             <div className="survey-detail__options">
//               {options.map((option) => (
//                 <label
//                   key={option.id}
//                   className={`survey-detail__option ${
//                     selectedOption === option.id ? "survey-detail__option--selected" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="survey-option"
//                     value={option.id}
//                     checked={selectedOption === option.id}
//                     onChange={() => setSelectedOption(option.id)}
//                   />
//                   {option.choice_text}
//                 </label>
//               ))}
//             </div>

//             {error && <p className="survey-detail__error">{error}</p>}

//             <button type="submit" className="survey-detail__submit" disabled={submitting}>
//               {submitting ? "Submitting..." : "Submit Vote"}
//             </button>
//           </form>
//         )}

//         {survey.category && (
//           <div className="survey-detail__category">Category: {survey.category}</div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SurveyDetailPage;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BarChart3, CheckCircle2 } from "lucide-react";
import {
  fetchSurveyById,
  fetchOptionsForSurvey,
  getUserVote,
  submitVote,
} from "../utils/surveyApi";
import type { Survey, SurveyOption } from "../types/survey";
import { useAuth } from "../context/AuthContext";
import "../style/surveyDetail.css";

const SurveyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [options, setOptions] = useState<SurveyOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [alreadyVotedFor, setAlreadyVotedFor] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const surveyId = Number(id);

  useEffect(() => {
    if (!surveyId) return;

    let mounted = true;
    setLoading(true);

    Promise.all([
      fetchSurveyById(surveyId),
      fetchOptionsForSurvey(surveyId),
      user ? getUserVote(surveyId, user.id) : Promise.resolve(null),
    ])
      .then(([surveyData, optionsData, voteData]) => {
        if (!mounted) return;
        setSurvey(surveyData);
        setOptions(optionsData);
        if (voteData) setAlreadyVotedFor(voteData.option_id);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Failed to load this survey.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [surveyId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!selectedOption) {
      setError("Please choose an option before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitVote(surveyId, selectedOption, user.id);
      navigate(`/surveys/${surveyId}/results`);
    } catch (err: any) {
      setError(err.message || "Could not submit your vote. Have you already voted?");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="survey-detail__status">Loading...</p>;
  if (error && !survey) return <p className="survey-detail__status survey-detail__status--error">{error}</p>;
  if (!survey) return null;

  return (
    <section className="survey-detail">
      <div className="survey-detail__card">
        <div className="survey-detail__header">
          <span className="survey-detail__icon">
            <BarChart3 size={20} />
          </span>
          <div>
            <h2>{survey.question}</h2>
            {survey.description && <p>{survey.description}</p>}
          </div>
        </div>

        {alreadyVotedFor ? (
          <div className="survey-detail__voted">
            <CheckCircle2 size={18} />
            <span>
              You've already voted on this poll.{" "}
              <Link to={`/surveys/${surveyId}/results`}>View live results</Link>
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="survey-detail__form">
            <div className="survey-detail__options">
              {options.map((option) => (
                <label
                  key={option.id}
                  className={`survey-detail__option ${
                    selectedOption === option.id ? "survey-detail__option--selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="survey-option"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                  />
                  {option.choice_text}
                </label>
              ))}
            </div>

            {error && <p className="survey-detail__error">{error}</p>}

            <button type="submit" className="survey-detail__submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Vote"}
            </button>
          </form>
        )}

        {survey.category && (
          <div className="survey-detail__category">Category: {survey.category}</div>
        )}
      </div>
    </section>
  );
};

export default SurveyDetailPage;
