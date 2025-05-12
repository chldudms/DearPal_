import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";
import ProfileModal from "../pages/Profile"; 


const Navibar = () => {

    const [isOpen, setOpen] = useState(false);

   
    return (

        <div>
            <div className="navbar">
             <div className="logo">DEARPAL</div>
             <div className="navContent">
                <Link to="/About" id="h">열린 편지함</Link>
                <Link to="/List">내 편지함</Link>
                    <img src="img/profile.png" alt="profile img" onClick={()=>setOpen(!isOpen)} className="profile"/>
                {isOpen && <ProfileModal onClose={() => setOpen(false)} />}
               </div>
            </div>

        </div>
    );


}

export default Navibar;