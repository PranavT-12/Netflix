import React from "react";
import "./banner.css";
import { useNavigate } from "react-router-dom";
import bannerMovie from "../bannerMovie"; 

export default function Banner({ movie }) {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    // navigate(`/watch/${movie.id}`);
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please Sign in first to continue.");
      return;
    }
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="bannerBox">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${bannerMovie.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="banner-Content">
          <h1 className="title">{bannerMovie.name}</h1>
          <p className="sub-title">
            "Doctor Strange faces the multiverse’s darkest realities to stop a new, reality-breaking threat."
          </p>

          <button
            className="play-btn"
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn");
              if (isLoggedIn !== "true") {
                alert("Please Sign in first to continue.");
                return;
              }
              navigate(`/watch/${bannerMovie.id}`);
            }}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

