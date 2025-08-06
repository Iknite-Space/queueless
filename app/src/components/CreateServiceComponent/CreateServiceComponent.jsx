import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CreateServiceComponent.css";

CreateServiceComponent.propTypes = {
  org_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export function CreateServiceComponent({ org_id, onClose }) {
  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const duration = parseInt(formData.duration, 10);

    const requestBody = {
      service_name: formData.service_name,
      service_description: formData.service_description,
      duration: duration,
      organization_id: org_id,
    };

    try {
      const res = await fetch(
        `http://localhost:8085/api/v1/${org_id}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (res.ok) {
        alert("Service added successfully!");
        onClose();
      } else {
        alert("Failed to add service.");
        console.log(JSON.stringify(requestBody))
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Service</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="service_name"
            placeholder="Service Name"
            value={formData.service_name}
            onChange={handleChange}
            required
          />
          <textarea
            name="service_description"
            placeholder="Description"
            value={formData.service_description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <div className="actions">
            <button className="submit-button" type="submit">Create</button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

