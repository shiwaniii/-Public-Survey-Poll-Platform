import "./question.css";
export default function Question({
  question,
  options,
  onAnswer,
}) {
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