import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
    basedURL: "https://netflix-ifjl.onrender.com",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export default axiosInstance;