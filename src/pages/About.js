import React from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navibar";
import '../styles/publicPostbox.css'

const About = () => {
    const navigate = useNavigate();

    const letterPage = () => {
        navigate("/Letter");
    };

    return (
        <div>
            <Navibar /> {/* 헤더 컴포넌트 삽입 */}
            <button className="writeBtn" onClick={letterPage}><img src="/img/plus.png" alt="plusBtn img"/></button>
        </div>
    );
};

export default About;
