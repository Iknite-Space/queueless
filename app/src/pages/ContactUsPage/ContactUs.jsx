import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router";
import "./ContactUs.css";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t2532vi", "template_zfszfcc", form.current, {
        publicKey: "FY-IgTNiDF8Jyhzb0",
      })
      .then(
        () => {
          console.log("Request sent! We'll get back to you.");
        },
        (error) => {
          console.log("Failed to send:", error.text);
        }
      );
  };

  return (
    <div className="contact-details">
      <div className="form-header">
        <h1>Contact the Qless Team</h1>
        <p>
          Let&apos;s get this conversation started. Tell us about your
          organization, and we&apos;ll get in touch as soon as we can.{" "}
        </p>
      </div>
      <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
          <label>Organization</label>
          <input
            className="input-block"
            type="text"
            name="user_name"
            placeholder="Enter your organizaton name"
            required
          />
          <label>Email</label>
          <input
            className="input-block"
            type="email"
            name="user_email"
            placeholder="Enter your organizaton email"
            required
          />
          <label>Message</label>
          <textarea
            id="message"
            rows="12"
            cols="50"
            placeholder="Enter your message here..."
          />
          <button
            className="submit-btn"
            type="submit"
            id="submit"
            value="Submit"
          >
            Request Access
          </button>
          <div>
            Already have an account? <Link to="/login">Login</Link>
            {/* <a href="/login">Login</a> */}
          </div>
        </form>
      </div>
    </div>
  );
};
