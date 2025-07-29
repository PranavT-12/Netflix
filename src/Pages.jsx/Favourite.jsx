import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./favourite.css";

const Favourite = () => {
    const [favMovies, setFavMovies] = useState([]);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${backendUrl}/api/favourite/${userId}`);
                setFavMovies(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching favourites:", err);
                setFavMovies([]);
            }
        };

        if (userId) fetchFavourites();
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.delete(`${backendUrl}/api/favourite/delete/${id}`);
            setFavMovies((prev) => prev.filter(item => item._id !== id));
            alert("Deleted Successfully");
        } catch (err) {
            console.error("Error deleting favourite:", err);
            alert("Failed to delete");
        }
    };

    return (
        <div className="favourite">
            <h2>Favourites</h2>
            <div className="movie-grid">
                {favMovies.length > 0 ? (
                    favMovies.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="movie-card"
                            onClick={() => navigate(`/watch/${item.movie.id}`)}
                        >
                            <img src={item.movie.image} alt={item.movie.name} />
                            <h4>{item.movie.name}</h4>
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item._id);
                                }}
                            >
                                ❌ Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Favourites Added</p>
                )}
            </div>
        </div>
    );
};

export default Favourite;