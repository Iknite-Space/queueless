import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Authentication.css";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export function Authentication() {

  const navigate = useNavigate();
  // const { userLoggedIn } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(form.email, form.password)
        setForm({email:"", password:""})
        navigate("/organization/")
      } catch (error) {
        toast.error(error.Message || "Login failed. Try again");
        console.log("Login error:", error)
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/contact");
  };
  return (
    <div className="auth-container">
      <ToastContainer position="top-right" autoClose={4000} />

      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={isSigningIn}>
          {isSigningIn ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="toggle-text">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="toggle-button"
          onClick={handleSignUpRedirect}
        >
          Contact Us
        </button>
      </p>
    </div>
  );
}
