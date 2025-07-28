import React from "react";
import "./footer.css";

export default function Footer() {
    return (
        <footer className="custom-footer">
            <div className="footer-content">
            <div className="social-icons">
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-square-x-twitter"></i>
            </div>
            <p className="copyright">&copy; Netflix Private Limited</p>
            <div className="links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
            </div>
        </footer>
    );
}



