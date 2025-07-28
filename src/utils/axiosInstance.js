import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
    basedURL: "http://localhost:5000/api/",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export default axiosInstance;