import { useState } from "react";

export default function PollSurvey() {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      alert("Please select Yes or No.");
      return;
    }

    alert("Poll submitted successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0056b3",
            marginBottom: "15px",
          }}
        >
          Do You Think Your Ward Is Clean?
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Help improve your ward by answering this quick poll. Your opinion
          helps the municipality understand public needs and improve local
          services.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              marginBottom: "30px",
            }}
          >
            <label style={{ fontSize: "18px", cursor: "pointer" }}>
              <input
                type="radio"
                value="Yes"
                checked={answer === "Yes"}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              Yes
            </label>

            <label style={{ fontSize: "18px", cursor: "pointer" }}>
              <input
                type="radio"
                value="No"
                checked={answer === "No"}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              No
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0056b3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            Submit Poll
          </button>
        </form>
      </div>
    </div>
  );
}