import React, { useState } from "react";
import "./ComplaintForm.css";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    community: "",
    category: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage
    localStorage.setItem("complaintData", JSON.stringify(formData));

    alert("Your complaint has been saved locally!");
    setFormData({ name: "", community: "", category: "", details: "" });
  };

  return (
    <div className="form-container">
      <h1 className="title">Tribal Complaint Submission</h1>
      <p className="subtitle">
        Please provide your details below. Your information will be stored safely.
      </p>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tribal Community:
          <input
            type="text"
            name="community"
            placeholder="Enter your community"
            value={formData.community}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category of Complaint:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Land Rights">Land Rights</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Employment">Employment</option>
            <option value="Others">Others</option>
          </select>
        </label>

        <label>
          Other Details:
          <textarea
            name="details"
            placeholder="Describe your complaint here..."
            value={formData.details}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </label>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
