import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navibar = () => {

   
    return (

        <div>
            <div className="navbar">
             <div className="logo">DEARPAL</div>
             <div className="navContent">
                <Link to="/About" id="h">열린 편지함</Link>
                <Link to="/List">내 편지함</Link>
                <Link to="/Profile" ><img src="img/profile.png" alt="profile img" className="profile" /></Link>
               </div>
            </div>
        </div>
    );


}

export default Navibar;