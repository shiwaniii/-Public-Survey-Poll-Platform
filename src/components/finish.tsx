interface FinishProps {
  onRestart?: () => void;
}

export default function Finish({ onRestart }: FinishProps) {
  return (
    <div className="survey-container">
      <div className="survey-card" style={{ textAlign: "center" }}>
        <h1>🎉 Thank You!</h1>

        <p>
          Your responses have been submitted successfully.
        </p>

        <p>
          Your feedback will help improve services and support better
          decision-making in your ward.
        </p>

        {onRestart && (
          <button
            onClick={onRestart}
            style={{ marginTop: "20px" }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}