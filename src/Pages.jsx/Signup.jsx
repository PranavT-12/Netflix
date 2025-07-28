import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // ✅ Added name field
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                name,
                email,
                password,
            });

            if (res.status === 201) {
                alert("Signup successful ✅");
                navigate("/signin");
            }
        } catch (err) {
            console.error("Signup error:", err);
            if (err.response && err.response.data?.message) {
                alert("Error: " + err.response.data.message);
            } else {
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className="signup-screen">
            <div className="Soverlay"></div>
            <img className="Nlogo" src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
                alt="Netflix logo" />

            <div className="signup-box">
                <h2>Welcome to Netflix</h2>

                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <button className="FormBtn" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;