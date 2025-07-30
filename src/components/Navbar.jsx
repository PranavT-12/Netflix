import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("You have been logged out successfully.");
    navigate("/signin");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      alert("Please enter something to search.");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="Navbar">
        <img
          className="logo"
          src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
          alt="Netflix Logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <input
          type="text"
          placeholder="Search movies..."
          className="S-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="S-button" onClick={handleSearch}>
          Search
        </button>

        {/* Hamburger icon for small screens */}
        <div className="hamburger" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop buttons */}
        <div className="nav-buttons desktop-buttons">
          <div className="navbar-content">
          <button className="btn" onClick={() => navigate("/favourite")}>
            Favourites
          </button>
          <button className="Sbtn" onClick={() => navigate("/signin")}>
            Sign In
          </button>
          <button className="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="btn" onClick={() => { toggleSidebar(); navigate("/favourite"); }}>
          Favourites
        </button>
        <button className="Sbtn" onClick={() => { toggleSidebar(); navigate("/signin"); }}>
          Sign In
        </button>
        <button className="button" onClick={() => { toggleSidebar(); handleLogout(); }}>
          Log Out
        </button>
      </div>
    </>
  );
}

