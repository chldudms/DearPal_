import React from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navibar";
import '../styles/publicPostbox.css'
// import { response } from "express";


const About = () => {
    const navigate = useNavigate();

    const letterPage = () => {
        navigate("/Letter");
    };

    // function loadLetters() {
    //     fetch('/loadletters', {
    //         method: 'GET',
    //     }).then(response => {
    //         return response.json();
    //     })
    //         .then(data => {
    //             console.log(data);
    //         })
    //         .request();
    // }

    return (
    <div>
            <Navibar /> {/* 헤더 컴포넌트 삽입 */}
            <button className="writeBtn" onClick={letterPage}><img src="/img/plus.png" alt="plusBtn img"/></button>
            
        <div className="letterList">
            <div className="letter"></div>
            <h3 className="letterWriter"></h3>
            <div className="letter2"></div>
            <div className="letter3"></div>
            <div className="letter4"></div>
            </div>
     </div>

        
    );
};

export default About;
