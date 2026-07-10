import "../style/question.css";

type QuestionProps = {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
};

export default function Question({
  question,
  options,
  onAnswer,
}: QuestionProps) {
  return (
    <div className="question">

      <h3>{question}</h3>

      {options.map((option, index) => (
        <label key={index}>

          <input
            type="radio"
            name={question}
            value={option}
            onChange={(e) => onAnswer(e.target.value)}
          />

          {option}

        </label>
      ))}

    </div>
  );
}