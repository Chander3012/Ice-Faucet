import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    document.title = "Login - ICE Faucet";
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message, "error");
      } else {
        // Save token
        localStorage.setItem("token", data.token);

        // Save username and points for display (optional)
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("points", data.user.points);

        Swal.fire("Success", "Login successful!", "success").then(() =>
          navigate("/dashboard")
        );
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
        <h2 className={style.title}>Login</h2>
        <form className={style.form} onSubmit={handleSubmit}>
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
          <button type="submit" className={style.button}>Login</button>
        </form>
        <div className={style.footer}>
          Don't have an account?{" "}
          <Link to="/register" className={style.link}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
