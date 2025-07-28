import React from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);


  const HandleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.user._id);  // ✅ Save user ID
        localStorage.setItem("token", data.token);
        alert("Login successful, Welcome To the Netflix.");
        navigate("/");  // ✅ Redirect to Home
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="SignIn-screen">
      <div className="overlay"></div>
      <img className="Netlogo" src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
        alt="Netflix logo"></img>

      <div className="SignIn-box">
        <h2>Sign In</h2>
        <form onSubmit={HandleSignIn}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>
        </form>

        <div className="helper-links">
          <span>
            New to Netflix? <Link to="/Signup">Sign up now.</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
