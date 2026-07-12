// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { PlusCircle, Trash2 } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import {
//   fetchSurveyById,
//   fetchOptionsForSurvey,
//   updateSurvey,
//   updateOption,
//   addOption,
//   deleteOption,
// } from "../utils/surveyApi";
// import type { Survey, SurveyOption } from "../types/survey";
// import "../style/createSurvey.css";

// type EditableOption = SurveyOption & { isNew?: boolean; isRemoved?: boolean };

// let tempIdCounter = -1; // negative ids mark not-yet-saved options

// const EditSurveyPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const surveyId = Number(id);
//   const navigate = useNavigate();
//   const { user, profile, loading: authLoading } = useAuth();

//   const [survey, setSurvey] = useState<Survey | null>(null);
//   const [question, setQuestion] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [expiresAt, setExpiresAt] = useState("");
//   const [isActive, setIsActive] = useState(true);
//   const [options, setOptions] = useState<EditableOption[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!surveyId) return;
//     let mounted = true;

//     Promise.all([fetchSurveyById(surveyId), fetchOptionsForSurvey(surveyId)])
//       .then(([surveyData, optionsData]) => {
//         if (!mounted) return;
//         setSurvey(surveyData);
//         setQuestion(surveyData.question);
//         setDescription(surveyData.description || "");
//         setCategory(surveyData.category || "");
//         setIsActive(surveyData.is_active);
//         setExpiresAt(surveyData.expires_at ? surveyData.expires_at.slice(0, 10) : "");
//         setOptions(optionsData);
//       })
//       .catch((err) => setError(err.message || "Could not load this survey."))
//       .finally(() => setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, [surveyId]);

//   if (authLoading || loading) return <p className="create-survey__status">Loading...</p>;

//   if (!user) {
//     return (
//       <div className="create-survey__status">
//         Please <Link to="/login">log in</Link> to edit this survey.
//       </div>
//     );
//   }

//   if (!survey) {
//     return <p className="create-survey__status">{error || "Survey not found."}</p>;
//   }

//   const isOwner = survey.creator_id === user.id;
//   if (profile?.role !== "Admin" || !isOwner) {
//     return (
//       <div className="create-survey__status">
//         Only the ward administrator who created this survey can edit it.
//       </div>
//     );
//   }

//   const visibleOptions = options.filter((o) => !o.isRemoved);

//   const updateOptionText = (optionId: number, value: string) => {
//     setOptions((prev) =>
//       prev.map((o) => (o.id === optionId ? { ...o, choice_text: value } : o))
//     );
//   };

//   const addNewOption = () => {
//     setOptions((prev) => [
//       ...prev,
//       {
//         id: tempIdCounter--,
//         survey_id: surveyId,
//         choice_text: "",
//         display_order: prev.length,
//         isNew: true,
//       },
//     ]);
//   };

//   const removeOption = (optionId: number) => {
//     setOptions((prev) =>
//       prev.map((o) => (o.id === optionId ? { ...o, isRemoved: true } : o))
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const kept = options.filter((o) => !o.isRemoved);
//     const validKept = kept.filter((o) => o.choice_text.trim().length > 0);

//     if (!question.trim()) {
//       setError("Please enter a survey question.");
//       return;
//     }
//     if (validKept.length < 2) {
//       setError("Please keep at least two answer options.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await updateSurvey(surveyId, {
//         question: question.trim(),
//         description: description.trim(),
//         category: category.trim(),
//         expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
//         isActive,
//       });

//       // removed existing options -> delete
//       const removedExisting = options.filter((o) => o.isRemoved && !o.isNew);
//       for (const opt of removedExisting) {
//         await deleteOption(opt.id);
//       }

//       // new options -> insert
//       const newOnes = options.filter((o) => o.isNew && !o.isRemoved && o.choice_text.trim());
//       for (let i = 0; i < newOnes.length; i++) {
//         await addOption(surveyId, newOnes[i].choice_text.trim(), i);
//       }

//       // existing, kept, possibly edited -> update text
//       const existingKept = options.filter((o) => !o.isNew && !o.isRemoved);
//       for (const opt of existingKept) {
//         await updateOption(opt.id, opt.choice_text.trim());
//       }

//       navigate(`/surveys/${surveyId}/results`);
//     } catch (err: any) {
//       setError(err.message || "Could not save changes.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="create-survey">
//       <form className="create-survey__card" onSubmit={handleSubmit}>
//         <h2>Edit Survey</h2>
//         <p>Update this poll's question, options, or status.</p>

//         <div className="create-survey__group">
//           <label>Question</label>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             required
//           />
//         </div>

//         <div className="create-survey__group">
//           <label>Description (optional)</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
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
//           <label className="create-survey__checkbox-label">
//             <input
//               type="checkbox"
//               checked={isActive}
//               onChange={(e) => setIsActive(e.target.checked)}
//             />
//             Survey is active (visible to residents)
//           </label>
//         </div>

//         <div className="create-survey__group">
//           <label>Answer Options</label>
//           {visibleOptions.map((option) => (
//             <div key={option.id} className="create-survey__option-row">
//               <input
//                 type="text"
//                 value={option.choice_text}
//                 onChange={(e) => updateOptionText(option.id, e.target.value)}
//                 placeholder="Option text"
//               />
//               {visibleOptions.length > 2 && (
//                 <button
//                   type="button"
//                   className="create-survey__remove-btn"
//                   onClick={() => removeOption(option.id)}
//                   aria-label="Remove option"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button type="button" className="create-survey__add-btn" onClick={addNewOption}>
//             <PlusCircle size={16} />
//             Add another option
//           </button>
//         </div>

//         {error && <p className="create-survey__error">{error}</p>}

//         <button type="submit" className="create-survey__submit" disabled={submitting}>
//           {submitting ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default EditSurveyPage;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  fetchSurveyById,
  fetchOptionsForSurvey,
  updateSurvey,
  updateOption,
  addOption,
  deleteOption,
} from "../utils/surveyApi";
import type { Survey, SurveyOption } from "../types/survey";
import "../style/createSurvey.css";

type EditableOption = SurveyOption & { isNew?: boolean; isRemoved?: boolean };

let tempIdCounter = -1; // negative ids mark not-yet-saved options

const EditSurveyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const surveyId = Number(id);
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [options, setOptions] = useState<EditableOption[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!surveyId) return;
    let mounted = true;

    Promise.all([fetchSurveyById(surveyId), fetchOptionsForSurvey(surveyId)])
      .then(([surveyData, optionsData]) => {
        if (!mounted) return;
        setSurvey(surveyData);
        setQuestion(surveyData.question);
        setDescription(surveyData.description || "");
        setCategory(surveyData.category || "");
        setIsActive(surveyData.is_active);
        setExpiresAt(surveyData.expires_at ? surveyData.expires_at.slice(0, 10) : "");
        setOptions(optionsData);
      })
      .catch((err) => setError(err.message || "Could not load this survey."))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [surveyId]);

  if (authLoading || loading) return <p className="create-survey__status">Loading...</p>;

  if (!user) {
    return (
      <div className="create-survey__status">
        Please <Link to="/login">log in</Link> to edit this survey.
      </div>
    );
  }

  if (!survey) {
    return <p className="create-survey__status">{error || "Survey not found."}</p>;
  }

  const isOwner = survey.creator_id === user.id;
  if (profile?.role !== "Admin" || !isOwner) {
    return (
      <div className="create-survey__status">
        Only the ward administrator who created this survey can edit it.
      </div>
    );
  }

  const visibleOptions = options.filter((o) => !o.isRemoved);

  const updateOptionText = (optionId: number, value: string) => {
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, choice_text: value } : o))
    );
  };

  const addNewOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: tempIdCounter--,
        survey_id: surveyId,
        choice_text: "",
        display_order: prev.length,
        isNew: true,
      },
    ]);
  };

  const removeOption = (optionId: number) => {
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, isRemoved: true } : o))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const kept = options.filter((o) => !o.isRemoved);
    const validKept = kept.filter((o) => o.choice_text.trim().length > 0);

    if (!question.trim()) {
      setError("Please enter a survey question.");
      return;
    }
    if (validKept.length < 2) {
      setError("Please keep at least two answer options.");
      return;
    }

    setSubmitting(true);
    try {
      await updateSurvey(surveyId, {
        question: question.trim(),
        description: description.trim(),
        category: category.trim(),
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        isActive,
      });

      // removed existing options -> delete
      const removedExisting = options.filter((o) => o.isRemoved && !o.isNew);
      for (const opt of removedExisting) {
        await deleteOption(opt.id);
      }

      // new options -> insert
      const newOnes = options.filter((o) => o.isNew && !o.isRemoved && o.choice_text.trim());
      for (let i = 0; i < newOnes.length; i++) {
        await addOption(surveyId, newOnes[i].choice_text.trim(), i);
      }

      // existing, kept, possibly edited -> update text
      const existingKept = options.filter((o) => !o.isNew && !o.isRemoved);
      for (const opt of existingKept) {
        await updateOption(opt.id, opt.choice_text.trim());
      }

      navigate(`/surveys/${surveyId}/results`);
    } catch (err: any) {
      setError(err.message || "Could not save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-survey">
      <form className="create-survey__card" onSubmit={handleSubmit}>
        <h2>Edit Survey</h2>
        <p>Update this poll's question, options, or status.</p>

        <div className="create-survey__group">
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="create-survey__group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <label className="create-survey__checkbox-label">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Survey is active (visible to residents)
          </label>
        </div>

        <div className="create-survey__group">
          <label>Answer Options</label>
          {visibleOptions.map((option) => (
            <div key={option.id} className="create-survey__option-row">
              <input
                type="text"
                value={option.choice_text}
                onChange={(e) => updateOptionText(option.id, e.target.value)}
                placeholder="Option text"
              />
              {visibleOptions.length > 2 && (
                <button
                  type="button"
                  className="create-survey__remove-btn"
                  onClick={() => removeOption(option.id)}
                  aria-label="Remove option"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button type="button" className="create-survey__add-btn" onClick={addNewOption}>
            <PlusCircle size={16} />
            Add another option
          </button>
        </div>

        {error && <p className="create-survey__error">{error}</p>}

        <button type="submit" className="create-survey__submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default EditSurveyPage;