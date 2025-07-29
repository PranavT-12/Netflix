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

  const handleAddToList = async (movie) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userId = localStorage.getItem("userId");

  if (isLoggedIn !== "true") {
    alert("Please sign in to add to your list.");
    return;
  }

  try {
    const response = await axios.post("/list/add", {
      userId,
      movie,
    });
    alert("Added to My List");
  } catch (err) {
    console.error("Error adding to list", err);
    alert("Failed to add to list");
  }
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

