// import "../style/question.css";

// type QuestionProps = {
//   question: string;
//   options: string[];
//   onAnswer: (answer: string) => void;
// };

// export default function Question({
//   question,
//   options,
//   onAnswer,
// }: QuestionProps) {
//   return (
//     <div className="question">

//       <h3>{question}</h3>

//       {options.map((option, index) => (
//         <label key={index}>

//           <input
//             type="radio"
//             name={question}
//             value={option}
//             onChange={(e) => onAnswer(e.target.value)}
//           />

//           {option}

//         </label>
//       ))}

//     </div>
//   );
// }


import React, { useState } from "react";
import { BarChart3, Tag } from "lucide-react";
import "../style/question.css";

type RatingOption = {
  id: string;
  label: string;
  color: string;
};

const ratingOptions: RatingOption[] = [
  { id: "very-satisfied", label: "Very Satisfied", color: "#2563eb" },
  { id: "satisfied", label: "Satisfied", color: "#16a34a" },
  { id: "neutral", label: "Neutral", color: "#facc15" },
  { id: "dissatisfied", label: "Dissatisfied", color: "#fb923c" },
  { id: "very-dissatisfied", label: "Very Dissatisfied", color: "#ef4444" },
];

const Question: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="question">
      <div className="question__header">
        <span className="question__icon">
          <BarChart3 size={20} />
        </span>
        <h2 className="question__title">How satisfied are you with our service?</h2>
      </div>

      <div className="question__options">
        {ratingOptions.map((option) => (
          <label
            key={option.id}
            className="question__option"
            style={{ ["--option-color" as any]: option.color }}
          >
            <span className="question__radio">
              {selected === option.id && <span className="question__radio-dot" />}
            </span>
            <input
              type="radio"
              name="satisfaction"
              value={option.id}
              className="question__radio-input"
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <hr className="question__divider" />

      <div className="question__category">
        <div className="question__category-label">
          <Tag size={14} />
          Category
        </div>
        <div className="question__category-value">Customer Feedback</div>
      </div>
    </div>
  );
};

export default Question;
