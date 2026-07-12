// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { PlusCircle, Trash2 } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { createSurvey } from "../utils/surveyApi";
// import "../style/createSurvey.css";

// const CreateSurveyPage: React.FC = () => {
//   const { user, profile, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [question, setQuestion] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [expiresAt, setExpiresAt] = useState("");
//   const [options, setOptions] = useState(["", ""]);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   if (authLoading) return <p className="create-survey__status">Loading...</p>;

//   if (!user) {
//     return (
//       <div className="create-survey__status">
//         Please <Link to="/login">log in</Link> to create a survey.
//       </div>
//     );
//   }

//   if (profile?.role !== "Admin") {
//     return (
//       <div className="create-survey__status">
//         Only ward administrators can create surveys.
//       </div>
//     );
//   }

//   const updateOption = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
//   };

//   const addOption = () => setOptions((prev) => [...prev, ""]);

//   const removeOption = (index: number) =>
//     setOptions((prev) => prev.filter((_, i) => i !== index));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
//     if (!question.trim()) {
//       setError("Please enter a survey question.");
//       return;
//     }
//     if (cleanOptions.length < 2) {
//       setError("Please provide at least two answer options.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const survey = await createSurvey(
//         question.trim(),
//         description.trim(),
//         category.trim(),
//         user.id,
//         cleanOptions,
//         expiresAt ? new Date(expiresAt).toISOString() : null
//       );
//       navigate(`/surveys/${survey.id}`);
//     } catch (err: any) {
//       setError(err.message || "Could not create the survey.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="create-survey">
//       <form className="create-survey__card" onSubmit={handleSubmit}>
//         <h2>Create a New Survey</h2>
//         <p>Design a poll for residents in your ward to vote on.</p>

//         <div className="create-survey__group">
//           <label>Question</label>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="e.g. Should the ward add more streetlights?"
//             required
//           />
//         </div>

//         <div className="create-survey__group">
//           <label>Description (optional)</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Give residents context for this question."
//             rows={3}
//           />
//         </div>

//         <div className="create-survey__row">
//           <div className="create-survey__group">
//             <label>Category (optional)</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               placeholder="e.g. Infrastructure"
//             />
//           </div>

//           <div className="create-survey__group">
//             <label>Expires on (optional)</label>
//             <input
//               type="date"
//               value={expiresAt}
//               onChange={(e) => setExpiresAt(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="create-survey__group">
//           <label>Answer Options</label>
//           {options.map((option, index) => (
//             <div key={index} className="create-survey__option-row">
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(e) => updateOption(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//               />
//               {options.length > 2 && (
//                 <button
//                   type="button"
//                   className="create-survey__remove-btn"
//                   onClick={() => removeOption(index)}
//                   aria-label="Remove option"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button type="button" className="create-survey__add-btn" onClick={addOption}>
//             <PlusCircle size={16} />
//             Add another option
//           </button>
//         </div>

//         {error && <p className="create-survey__error">{error}</p>}

//         <button type="submit" className="create-survey__submit" disabled={submitting}>
//           {submitting ? "Creating..." : "Publish Survey"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default CreateSurveyPage;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createSurvey } from "../utils/surveyApi";
import "../style/createSurvey.css";

const CreateSurveyPage: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (authLoading) return <p className="create-survey__status">Loading...</p>;

  if (!user) {
    return (
      <div className="create-survey__status">
        Please <Link to="/login">log in</Link> to create a survey.
      </div>
    );
  }

  if (profile?.role !== "Admin") {
    return (
      <div className="create-survey__status">
        Only ward administrators can create surveys.
      </div>
    );
  }

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const addOption = () => setOptions((prev) => [...prev, ""]);

  const removeOption = (index: number) =>
    setOptions((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim()) {
      setError("Please enter a survey question.");
      return;
    }
    if (cleanOptions.length < 2) {
      setError("Please provide at least two answer options.");
      return;
    }

    setSubmitting(true);
    try {
      const survey = await createSurvey(
        question.trim(),
        description.trim(),
        category.trim(),
        user.id,
        cleanOptions,
        expiresAt ? new Date(expiresAt).toISOString() : null
      );
      navigate(`/surveys/${survey.id}`);
    } catch (err: any) {
      setError(err.message || "Could not create the survey.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-survey">
      <form className="create-survey__card" onSubmit={handleSubmit}>
        <h2>Create a New Survey</h2>
        <p>Design a poll for residents in your ward to vote on.</p>

        <div className="create-survey__group">
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Should the ward add more streetlights?"
            required
          />
        </div>

        <div className="create-survey__group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Give residents context for this question."
            rows={3}
          />
        </div>

        <div className="create-survey__row">
          <div className="create-survey__group">
            <label>Category (optional)</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Infrastructure"
            />
          </div>

          <div className="create-survey__group">
            <label>Expires on (optional)</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>
        </div>

        <div className="create-survey__group">
          <label>Answer Options</label>
          {options.map((option, index) => (
            <div key={index} className="create-survey__option-row">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className="create-survey__remove-btn"
                  onClick={() => removeOption(index)}
                  aria-label="Remove option"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button type="button" className="create-survey__add-btn" onClick={addOption}>
            <PlusCircle size={16} />
            Add another option
          </button>
        </div>

        {error && <p className="create-survey__error">{error}</p>}

        <button type="submit" className="create-survey__submit" disabled={submitting}>
          {submitting ? "Creating..." : "Publish Survey"}
        </button>
      </form>
    </section>
  );
};

export default CreateSurveyPage;
