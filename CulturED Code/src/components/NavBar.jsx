import { Link } from 'react-router-dom';
import React from 'react';
import '../index.css';


export default function NavBar(props) {
    return (
        <header>
            <nav className="header-nav">
                <div className="logo">
                    <Link to="/">
                        <img src="../../public/cultured_logo-removebg-preview.png" alt="CulturED Logo" />
                    </Link>
                    <Link to="/"><h2 className="title">CulturED</h2></Link>
                </div>
                <ul className="nav">
                    <li className="nav-item py-1 px-2">
                        <Link to="/explorepage" className="btn header-btn">Explore</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="btn header-btn">My Communities</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="/sharestory" className="btn header-btn">Share Story</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="btn header-btn">Resources</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

