import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navibar";
import '../styles/publicPostbox.css'
import { jwtDecode } from "jwt-decode";
// import { response } from "express";


const About = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [letters, setLetters] = useState([]); 

    const [hovered, setHovered] = useState(null);

        function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
        }


    const letterPage = () => {
        navigate("/Letter");
    };

    const getLetterSVGPath = (color) => {
        switch (color) {
            case "pink":
                return "/svg/pinkLetter.svg";
            case "yellow":
                return "/svg/yellowLetter.svg";
            case "white":
                return "/svg/whiteLetter.svg";
            default:
                return "/svg/blueLetter.svg"; // 기본 파랑 편지지
        }
    };

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);
            } catch (err) {
                console.log(err);
            }
        }
    }, []); // 토큰 디코딩

    useEffect(() => {
        fetch("http://localhost:5000/openLetters", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "공개 편지 로드 성공") {
                    console.log("공개 편지:", data.letters);
                    setLetters(data.letters);



                } else {
                    console.warn("편지 없음:", data.message);
                }
            })
            .catch(err => {
                console.error("에러 발생:", err);
                window.alert("편지를 불러오는 중 오류 발생!");
            });
    }, []); // 편지 로드
    

    return (
    <div>
            <Navibar /> {/* 헤더 컴포넌트 삽입 */}
            <button className="writeBtn" onClick={letterPage}><img src="/img/plus.png" alt="plusBtn img"/></button>
            
            <div className="letterList">
                {letters.map((letter, i) => {
                    const color = letter.color || "white";
                    const closedSrc = `/svg/${capitalize(color)}Letter.svg`;
                    const openSrc = `/svg/${capitalize(color)}open.svg`;

                    return (
                    <div 
                        key={i}
                        className="letterItem"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img
                        src={hovered === i ? openSrc : closedSrc}
                        alt="letter svg"
                        className="letterSvg"
                        />
                        <h3 className="letterTitle">{letter.title}</h3>
                        <p className="letterSender">From: {letter.sender_name}</p>
                    </div>
                    );
                })}
        </div>


      </div>
 

        
    );
};

export default About;
