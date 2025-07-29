import "./watch.css";
import { useParams } from "react-router-dom";
import mockMovies from "../mockMovies";
import bannerMovie from "../bannerMovie";
import recommendedMovies from "../recommendedMovies";
import TopRatedMovies from "../TopRatedMovie";
import { Component, useState } from "react";
import { useLocation } from "react-router-dom";

const Watch = () => {
  const { movieId } = useParams();
  const [liked, setLiked] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");


  const movie =
    mockMovies.find((m) => m.id === movieId) ||
    recommendedMovies.find((m) => m.id === movieId) ||
    TopRatedMovies.find((m) => m.id === movieId) ||
    (bannerMovie.id === movieId ? bannerMovie : null);

  console.log("👉 movieId from URL:", movieId);
  console.log("🎞️ mockMovies list:", mockMovies);
  console.log("🎬 bannerMovie:", bannerMovie);
  console.log("✅ Matched movie object:", movie);


  if (!movie) {
    return <h1 className="watch-error">Movie not found!</h1>;
  }

  const handleLike = () =>
    setLiked(true);
  const handleDislike = () =>
    setLiked(false);
  const handleDeleteComment = (indexToDelete) => {
    const updateComments = comments.filter((_, i) => i !== indexToDelete);
    setComments(updateComments);
  };

  const handleAddComment = () => {
    if (commentInput.trim() !== "") {

      setComments([...comments,
        commentInput]);
      setCommentInput("");
    }
  };

  const handleAddToFavourites = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");

    if (!userId || isLoggedIn !== "true") {
      alert("Please Sign In First");
      return;
    }

    try {
      const movieData = {
        id: movie.id,
        name: movie.name,
        image: movie.image,
        trailerUrl: movie.trailerUrl,
      };
 
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/favourite/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movie: movieData, 
        }),
      });

      const data = await res.json();
      alert(data.message || "Added to Favourites");
    } catch (error) {
      console.error("Failed to add", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="watch">
      <h1 className="watch-title">Now Watching: {movie.name}</h1>
      <div className="video-container">
        <iframe
          className="video-frame"
          src={movie.trailerUrl.replace("watch?v=", "embed/")}
          title={`${movie.name} Trailer`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <br></br><br></br>
      {/* likke & disliked section */}
      <div className="LDC-section">
        <div className="like-dislike-section">
          <button onClick={handleLike} style={{ color: liked === true ? "red" : "" }}>
            👍 Like
          </button>
          <button onClick={handleDislike} style={{ color: liked === false ? "green" : "" }}>
            👎 Dislike
          </button>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>

          {comments.length === 0 ? (
            <p style={{ color: "gray " }}>No comments yet. Be the first one!</p>) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>🗨️ {comment} <span className="delete-comment" onClick={() => handleDeleteComment(index)}>&times;</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className="fav-btn" onClick={(handleAddToFavourites)}>+ Add to Favourites</button>
    </div>
  );
};

export default Watch;
