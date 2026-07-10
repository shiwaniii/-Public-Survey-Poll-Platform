import { useState } from "react";

const questions = [
  "Do you feel safe living in your ward?",
  "Are the roads in your ward in good condition?",
  "Are you satisfied with the drinking water supply?",
  "Is garbage collected regularly in your area?",
  "Do you think the ward office responds quickly to public issues?",
];

interface SurveyProps {
  onSubmit: () => void;
}

export default function Survey({ onSubmit }: SurveyProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (answers.includes("")) {
      alert("Please answer all questions.");
      return;
    }

    console.log(answers);
    onSubmit();
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <h1>Ward Survey</h1>
        <p>Please answer the following questions.</p>

        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <h3>{question}</h3>

              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  value="Yes"
                  checked={answers[index] === "Yes"}
                  onChange={() => handleChange(index, "Yes")}
                />
                Yes
              </label>

              <label style={{ marginLeft: "20px" }}>
                <input
                  type="radio"
                  name={`q${index}`}
                  value="No"
                  checked={answers[index] === "No"}
                  onChange={() => handleChange(index, "No")}
                />
                No
              </label>

              <hr />
            </div>
          ))}

          <button type="submit">Submit Survey</button>
        </form>
      </div>
    </div>
  );
}