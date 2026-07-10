import { useState } from "react";
import "../style/surveyform.css";



export default function SurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Survey Submitted!");
  //navigated to dashboard 
  };

  return (
    <div className="overlay">
      <div className="form-box">
        <h2>Customer Satisfaction Survey</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

          <p>Rate our service</p>

          <label>
            <input
              type="radio"
              name="rating"
              value="Excellent"
              onChange={handleChange}
            />
            Excellent
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Good"
              onChange={handleChange}
            />
            Good
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Average"
              onChange={handleChange}
            />
            Average
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Poor"
              onChange={handleChange}
            />
            Poor
          </label>

          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleSubmit}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
        