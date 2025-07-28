import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        alert("Signup successful ✅");
        navigate("/signin"); // redirect to signin page after signup
    };

    return (
        <div className="signup-screen">
            <div className="Soverlay"></div>
            <img className="Nlogo" src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
                alt="Netflix logo"></img>

            <div className="signup-box">
                <h2>Welcome to Netflix</h2>

                <form onSubmit={handleSignup}>
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