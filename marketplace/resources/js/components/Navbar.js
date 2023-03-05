import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import "../../css/homestyle.css";
import "../../css/pagestyle.css";

export default function Navbar() {
    const path = window.location.pathname
    const uname = localStorage.getItem("uname");
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const onlogout = (e) => {
        e.preventDefault();
        setauthenticated(false);
        localStorage.setItem("authenticated", false);
        localStorage.removeItem("uname");
        navigate("/login");
    };
    return (
        <nav className="header">
            <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
            <div className="header-right">
                <a href="/home" style={{ color: 'white' }} >Home</a>
                <a href="/about" style={{ color: 'white' }} >About</a>
                <a href="/service" style={{ color: 'white' }} >Service</a>
                <a href="/" style={{ color: 'white' }} >Blog</a>
                <a href="/contact" style={{ color: 'white' }} >Contact</a>
                <a href="/login" style={{ color: 'white' }} >Login/Register</a>
            </div>
        </nav>
    )
}


