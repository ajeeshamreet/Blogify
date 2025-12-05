import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>BlogifyX</h3>
                        <p>
                            A platform for creative minds to share their stories, ideas, and
                            perspectives with the world. Join our community today.
                        </p>
                    </div>
                    <div className="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/?cat=Technology">Technology</Link></li>
                            <li><Link to="/?cat=Lifestyle">Lifestyle</Link></li>
                            <li><Link to="/?cat=Travel">Travel</Link></li>
                            <li><Link to="/?cat=Food">Food</Link></li>
                            <li><Link to="/?cat=Art">Art</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h3>Connect</h3>
                        <p>Share your stories with the world</p>
                        <p>Join our community of writers</p>
                        <div className="socials">
                            <span>Twitter</span>
                            <span>LinkedIn</span>
                            <span>GitHub</span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} BlogifyX. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
