// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BarChart3, Calendar, PlusCircle, Tag } from "lucide-react";
// import { fetchActiveSurveys } from "../utils/surveyApi";
// import type { Survey } from "../types/survey";
// import { useAuth } from "../context/AuthContext";
// import "../style/surveyList.css";

// const SurveyListPage: React.FC = () => {
//   const { profile } = useAuth();
//   const [surveys, setSurveys] = useState<Survey[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const isAdmin = profile?.role === "Admin";

//   useEffect(() => {
//     let mounted = true;

//     fetchActiveSurveys()
//       .then((data) => {
//         if (mounted) setSurveys(data);
//       })
//       .catch((err) => {
//         if (mounted) setError(err.message || "Failed to load surveys.");
//       })
//       .finally(() => {
//         if (mounted) setLoading(false);
//       });

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <section className="survey-list">
//       <div className="survey-list__header">
//         <div>
//           <h1>Active Polls</h1>
//           <p>Browse and vote on surveys created by ward officials.</p>
//         </div>

//         {isAdmin && (
//           <Link to="/create-survey" className="survey-list__create-btn">
//             <PlusCircle size={16} />
//             Create Survey
//           </Link>
//         )}
//       </div>

//       {loading && <p className="survey-list__status">Loading surveys...</p>}
//       {error && <p className="survey-list__status survey-list__status--error">{error}</p>}

//       {!loading && !error && surveys.length === 0 && (
//         <p className="survey-list__status">No active surveys right now. Check back soon.</p>
//       )}

//       <div className="survey-list__grid">
//         {surveys.map((survey) => (
//           <div key={survey.id} className="survey-list__card">
//             <div className="survey-list__card-icon">
//               <BarChart3 size={18} />
//             </div>

//             <h3>{survey.question}</h3>
//             {survey.description && <p>{survey.description}</p>}

//             <div className="survey-list__meta">
//               {survey.category && (
//                 <span className="survey-list__tag">
//                   <Tag size={12} />
//                   {survey.category}
//                 </span>
//               )}
//               <span className="survey-list__tag">
//                 <Calendar size={12} />
//                 {new Date(survey.created_at).toLocaleDateString()}
//               </span>
//             </div>

//             <div className="survey-list__actions">
//               <Link to={`/surveys/${survey.id}`} className="survey-list__vote-btn">
//                 Vote Now
//               </Link>
//               <Link to={`/surveys/${survey.id}/results`} className="survey-list__results-link">
//                 View Results
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SurveyListPage;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Calendar, PlusCircle, Tag, Pencil, Trash2 } from "lucide-react";
import { fetchActiveSurveys, deleteSurvey } from "../utils/surveyApi";
import type { Survey } from "../types/survey";
import { useAuth } from "../context/AuthContext";
import "../style/surveyList.css";

const SurveyListPage: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isAdmin = profile?.role === "Admin";

  const loadSurveys = () => {
    setLoading(true);
    fetchActiveSurveys()
      .then((data) => setSurveys(data))
      .catch((err) => setError(err.message || "Failed to load surveys."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  const handleDelete = async (surveyId: number) => {
    const confirmed = window.confirm(
      "Delete this survey? This also removes all its options and votes. This cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(surveyId);
    try {
      await deleteSurvey(surveyId);
      setSurveys((prev) => prev.filter((s) => s.id !== surveyId));
    } catch (err: any) {
      setError(err.message || "Could not delete this survey.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="survey-list">
      <div className="survey-list__header">
        <div>
          <h1>Active Polls</h1>
          <p>Browse and vote on surveys created by ward officials.</p>
        </div>

        {isAdmin && (
          <Link to="/create-survey" className="survey-list__create-btn">
            <PlusCircle size={16} />
            Create Survey
          </Link>
        )}
      </div>

      {loading && <p className="survey-list__status">Loading surveys...</p>}
      {error && <p className="survey-list__status survey-list__status--error">{error}</p>}

      {!loading && !error && surveys.length === 0 && (
        <p className="survey-list__status">No active surveys right now. Check back soon.</p>
      )}

      <div className="survey-list__grid">
        {surveys.map((survey) => {
          const isOwner = isAdmin && user?.id === survey.creator_id;

          return (
            <div key={survey.id} className="survey-list__card">
              <div className="survey-list__card-icon">
                <BarChart3 size={18} />
              </div>

              <h3>{survey.question}</h3>
              {survey.description && <p>{survey.description}</p>}

              <div className="survey-list__meta">
                {survey.category && (
                  <span className="survey-list__tag">
                    <Tag size={12} />
                    {survey.category}
                  </span>
                )}
                <span className="survey-list__tag">
                  <Calendar size={12} />
                  {new Date(survey.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="survey-list__actions">
                <Link to={`/surveys/${survey.id}`} className="survey-list__vote-btn">
                  Vote Now
                </Link>
                <Link to={`/surveys/${survey.id}/results`} className="survey-list__results-link">
                  View Results
                </Link>
              </div>

              {isOwner && (
                <div className="survey-list__owner-actions">
                  <button
                    className="survey-list__edit-btn"
                    onClick={() => navigate(`/surveys/${survey.id}/edit`)}
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    className="survey-list__delete-btn"
                    onClick={() => handleDelete(survey.id)}
                    disabled={deletingId === survey.id}
                  >
                    <Trash2 size={13} />
                    {deletingId === survey.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SurveyListPage;
