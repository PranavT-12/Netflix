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

// import React, { useEffect, useState } from "react";
// import "./banner.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Banner() {
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBannerMovie = async () => {
//       try {
//         const res = await axios.get(
//           "http://www.omdbapi.com/?i=tt3896198&apikey=f2bc7203"
//         );
//         console.log(res.data);

//         if (res.data.Response === "True") {
//           setMovie(res.data);
//         } else {
//           console.error("Movie not found:", res.data.Error);
//           setMovie(null);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setMovie(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBannerMovie();
//   }, []);

//   const handlePlay = () => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn !== "true") {
//       alert("Please sign in first to continue.");
//       return;
//     }
//     navigate(`/watch/${movie.imdbID}`);
//   };

//   if (loading) return <h3 style={{ color: "white" }}>Loading...</h3>;
//   if (!movie) return <h3 style={{ color: "red" }}>Movie not found</h3>;

//   return (
//     <div className="bannerBox">
//       <div
//         className="banner"
//         style={{
//           backgroundImage: `url(${movie.Poster})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="banner-Content">
//           <h1 className="title">{movie.Title}</h1>
//           <p className="sub-title">{movie.Plot}</p>
//           <button className="play-btn" onClick={handlePlay}>
//             Play
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }