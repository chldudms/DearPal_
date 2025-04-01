import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return(

    <div> 
    <Link to="/">Home</Link>
            <Link to="/Post">Post</Link>
            <Link to="/Profile">Profile</Link> 
        
        
        <h1>about 화면 입니앙.</h1>

     </div>
    );


}

export default About;