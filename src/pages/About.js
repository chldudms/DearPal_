// About.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "./Navibar";

const About = () => {
    const navigate = useNavigate();

    const letterPage = () => {
        navigate("/Letter");
    };

    return (
        <div>
            <Navibar /> {/* 헤더 컴포넌트 삽입 */}
            <button id="writeLetter" onClick={letterPage}>편지쓰기</button>
        </div>
    );
};

export default About;
