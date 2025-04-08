import React from "react";
import { Link } from "react-router-dom";

const Navibar = () => {

   
    return (

        <div>
            <div className="navbar">
                <Link to="/About" id="h">Home</Link>
                <Link to="/List">Post</Link>
                <Link to="/Profile">Profile</Link>
            </div>

        
        </div>
    );


}

export default Navibar;