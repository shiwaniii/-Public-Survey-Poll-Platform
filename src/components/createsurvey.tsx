import React, { useState } from "react";
import "../style/CreateSurvey.css";

interface SurveyData {
  title: string;
  description: string;
  category: string;
  options: string[];
}

const CreateSurvey: React.FC = () => {
  const [survey, setSurvey] = useState<SurveyData>({
    title: "",
    description: "",
    category: "",
    options: ["", ""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setSurvey({
      ...survey,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...survey.options];
    updatedOptions[index] = value;

    setSurvey({
      ...survey,
      options: updatedOptions,
    });
  };

  const addOption = () => {
    setSurvey({
      ...survey,
      options: [...survey.options, ""],
    });
  };

  const removeOption = (index: number) => {
    if (survey.options.length <= 2) return;

    const updated = survey.options.filter((_, i) => i !== index);

    setSurvey({
      ...survey,
      options: updated,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Survey Data:", survey);

    alert("Survey Created Successfully!");

    setSurvey({
      title: "",
      description: "",
      category: "",
      options: ["", ""],
    });
  };

  return (
    <div className="create-survey-container">

      <div className="survey-box">

        <h1>Create Survey</h1>

        <form onSubmit={handleSubmit}>

          <label>Survey Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter survey title"
            value={survey.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Write survey description..."
            value={survey.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={survey.category}
            onChange={handleChange}
            required
          >
            <option value="">Choose Category</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Customer Feedback">Customer Feedback</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
          </select>

          <h3>Poll Options</h3>

          {survey.options.map((option, index) => (
            <div className="option-row" key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.target.value)
                }
                required
              />

              {survey.options.length > 2 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeOption(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="add-option-btn"
            onClick={addOption}
          >
            + Add Option
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            Create Survey
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateSurvey;