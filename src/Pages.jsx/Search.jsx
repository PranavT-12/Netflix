import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mockMovies from "../mockMovies";
import bannerMovies from "../bannerMovies";
import recommendedMovies from "../recommendedMovies";
import TopRatedMovies from "../TopRatedMovie";

import "./search.css";

const Search = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const allMovies = [...mockMovies, ...bannerMovies, ...recommendedMovies, ...TopRatedMovies];
    const navigate = useNavigate();

    // extract query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    useEffect(() => {
        if (query) {
            const filtered = allMovies.filter(movie =>
                movie.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        }
    }, [query]);

    const handleCardClick = (movieId) => {
        navigate(`/watch/${movieId}`);
    };

    return (
        <div>
            <div className="search-results">
                {results.length > 0 ? results.map((movie) => (
                    <div className="M-card" key={movie.id} onClick={() => handleCardClick(movie.id)}>
                        <img src={movie.image} alt={movie.name} />
                        <h4 className="M-title">{movie.name}</h4>
                    </div>
                )) : <p style={{ color: "white", textAlign: "center" }}>No movies found.</p>}
            </div>
        </div>
    );
};

export default Search;