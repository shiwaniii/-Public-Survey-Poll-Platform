import { useState } from "react";

export default function PollSurvey() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      alert("Please select Yes or No.");
      return;
    }

    // Later save to Supabase here
    setSubmitted(true);
  };

  // SCREEN 2
  if (submitted) {
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
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#0d6efd" }}>🎉 Thank You!</h1>

          <p style={{ margin: "20px 0", color: "#555", lineHeight: "1.6" }}>
            Your poll response has been submitted successfully.
            <br />
            Would you like to participate in a short survey?
            <br />
            It will take less than 2 minutes.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => alert("Go to Survey")}
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "8px",
                background: "#0d6efd",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Take Survey
            </button>

            <button
              onClick={() => alert("Thank you for participating!")}
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "8px",
                background: "#6c757d",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 1
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
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
        <h1 style={{ textAlign: "center", color: "#0056b3" }}>
          Do You Think Your Ward Is Clean?
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            margin: "20px 0",
          }}
        >
          Help improve your ward by answering this quick poll.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              marginBottom: "25px",
            }}
          >
            <label>
              <input
                type="radio"
                value="Yes"
                checked={answer === "Yes"}
                onChange={(e) => setAnswer(e.target.value)}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                value="No"
                checked={answer === "No"}
                onChange={(e) => setAnswer(e.target.value)}
              />
              No
            </label>
          </div>

          <button
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#0056b3",
              color: "#fff",
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