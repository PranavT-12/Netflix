import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import recommendedMovies from "../recommendedMovies";
import mockMovies from "../mockMovies";
import topRatedMovies from "../TopRatedMovie";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            const loggedIn = localStorage.getItem("isLoggedIn");
            if (loggedIn !== "true") {
                navigate("/signin");
            }
        };

        checkLogin();
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <Banner />
            <Row title="Trending Now" movies={mockMovies} isLargeRow />
            <Row title="Recommended For You" movies={recommendedMovies} isLargeRow />
            <Row title="Top Rated" movies={topRatedMovies} isLargeRow />
            <Footer />
        </div>
    );
}
