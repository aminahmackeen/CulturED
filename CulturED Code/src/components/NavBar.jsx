import { Link } from 'react-router-dom';
import React from 'react';
import '../index.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


export default function NavBar(props) {

    const handleSignOut = (event) => {
        console.log("signing out");
        signOut(auth);
    }

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
                        <Link to="/explorepage" className="header-btn">Explore</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="header-btn">My Communities</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="/sharestory" className="header-btn">Share Story</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="header-btn">Resources</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <button className="header-btn" onClick={handleSignOut}>LogOut</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

