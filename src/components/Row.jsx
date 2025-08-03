// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Row.css";
// import axios from '../utils/axiosInstance';

// function Row({ title = "Trending Now", movies = [], isLargeRow = false }) {
//   const navigate = useNavigate();

//   // ✅ Defensive check: Skip rendering if movies array is empty or undefined
//   if (!movies || movies.length === 0) {
//     return null;
//   }

//   // 🔐 Handle movie click with login check
//   const handleClick = (movie) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//     if (isLoggedIn !== "true") {
//       alert("Please Sign in first to continue.");
//       return;
//     }

//     navigate(`/watch/${movie.id}`);
//   };

//   return (
//     <div className="row">
//       <h2 className="row__title">{title}</h2>

//       <div className="row__posters">
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             src={movie.image}
//             alt={movie.name}
//             className={`video-player ${isLargeRow ? "row__posterLarge" : "row__poster"
//               }`}
//             onClick={() => handleClick(movie)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Row;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Row.css";
import axios from '../utils/axiosInstance';

function Row({ title = "Trending Now", fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(fetchUrl)
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Row fetch failed:", err));
  }, [fetchUrl]);

  if (!movies || movies.length === 0) return null;

  const handleClick = (movie) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Please Sign in first to continue.");
      return;
    }
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={movie.image}
            alt={movie.name}
            className={`video-player ${isLargeRow ? "row__posterLarge" : "row__poster"}`}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;