// client/src/pages/Register.jsx
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referrer: "", // New field added to formData
  });

  useEffect(() => {
    document.title = "Register - ICE Faucet";

    // Read ?ref=username from URL and store in localStorage
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      localStorage.setItem("referrer", ref);
      setFormData((prev) => ({ ...prev, referrer: ref }));
    } else {
      // Check if referral is already in localStorage
      const storedRef = localStorage.getItem("referrer");
      if (storedRef) {
        setFormData((prev) => ({ ...prev, referrer: storedRef }));
      }
    }
  }, [location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // referrer is included automatically
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message, "error");
      } else {
        Swal.fire("Success", "Registration successful!", "success").then(() => {
          localStorage.removeItem("referrer"); // Clear referral after use
          navigate("/login");
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className={style.container}>
      <button onClick={() => navigate("/")} className={style.back_button}>← Back</button>
      <div className={style.card}>
        <h2 className={style.title}>Register</h2>

        {formData.referrer && (
          <p className={style.refNotice}>
            👥 You were referred by: <strong>{formData.referrer}</strong>
          </p>
        )}

        <form className={style.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={style.input}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={style.input}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={style.input}
            onChange={handleChange}
            required
          />
          <button type="submit" className={style.button}>Register</button>
        </form>
        <div className={style.footer}>
          Already have an account? <Link to="/login" className={style.link}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
