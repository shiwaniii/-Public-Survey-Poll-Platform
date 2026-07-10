import { useState } from "react";
import "../PollSurvey.css";

const surveyQuestions = [
  {
    id: 1,
    question: "Do you think your ward is clean?",
    description:
      "Consider roads, public spaces, drainage, and waste management.",
  },
  {
    id: 2,
    question: "Do you feel safe living in your ward?",
    description:
      "Think about crime, street lighting, and public security.",
  },
  {
    id: 3,
    question: "Are the roads in your ward in good condition?",
    description:
      "Consider road quality and maintenance.",
  },
  {
    id: 4,
    question: "Are you satisfied with the drinking water supply?",
    description:
      "Consider water quality and availability.",
  },
  {
    id: 5,
    question: "Is garbage collected regularly in your area?",
    description:
      "Think about cleanliness and collection frequency.",
  },
  {
    id: 6,
    question: "Do you think the ward office responds quickly to public issues?",
    description:
      "Consider complaints, requests, and public services.",
  },
  {
    id: 7,
    question: "Are street lights sufficient in your neighborhood?",
    description:
      "Think about safety and visibility during the night.",
  },
  {
    id: 8,
    question: "Would you recommend your ward as a good place to live?",
    description:
      "Overall satisfaction with your ward.",
  },
];

export default function PollSurvey() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(answers);
    alert("Survey Submitted Successfully!");
  };

  return (
    <div className="survey-container">
      <form className="survey-card" onSubmit={handleSubmit}>
        <h1>Ward Public Opinion Survey</h1>
        <p>Please answer the following questions.</p>

        {surveyQuestions.map((item) => (
          <div key={item.id} className="question-card">
            <h3>{item.question}</h3>
            <p>{item.description}</p>

            <label>
              <input
                type="radio"
                name={`question-${item.id}`}
                value="Yes"
                checked={answers[item.id] === "Yes"}
                onChange={() => handleChange(item.id, "Yes")}
              />
              Yes
            </label>

            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name={`question-${item.id}`}
                value="No"
                checked={answers[item.id] === "No"}
                onChange={() => handleChange(item.id, "No")}
              />
              No
            </label>

            <hr />
          </div>
        ))}

        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}