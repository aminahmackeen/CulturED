import { Link } from 'react-router-dom';
import React from 'react';
import '../index.css';

// const NavBar = () => 
//     <header>
//         <nav className="header-nav">
//             <ul className="nav">
//                 <li className="nav-item">
//                     <Link to="#" className="btn header-btn logo">CultureED</Link>
//                 </li>
//                 <li className="nav-item empty"></li>
//                 <li className="nav-item py-1 px-2">
//                     <Link to="/ExplorePage" className="btn header-btn">Explore</Link>
//                 </li>
//                 <li className="nav-item py-1 px-2">
//                     <Link to="#" className="btn header-btn">My Communities</Link>
//                 </li>
//                 <li className="nav-item py-1 px-2">
//                     <Link to="#" className="btn header-btn">Share Story</Link>
//                 </li>
//                 <li className="nav-item py-1 px-2">
//                     <Link to="#" className="btn header-btn">Resources</Link>
//                 </li>
//             </ul> 
//         </nav>
//     </header>
// ;

// export default NavBar;


export default function NavBar(props) {

    return(
        <header>
            <nav className="header-nav">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="#" className="btn header-btn logo">CultureED</Link>
                    </li>
                    <li className="nav-item empty"></li>
                    <li className="nav-item py-1 px-2">
                        <Link to="/explorepage" className="btn header-btn">Explore</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="btn header-btn">My Communities</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="btn header-btn">Share Story</Link>
                    </li>
                    <li className="nav-item py-1 px-2">
                        <Link to="#" className="btn header-btn">Resources</Link>
                    </li>
                </ul> 
            </nav>
        </header>
    );
}