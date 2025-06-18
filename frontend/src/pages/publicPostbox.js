import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navibar";
import '../styles/publicPostbox.css'
import { jwtDecode } from "jwt-decode";
import LetterList from "../components/letterlist";
import Pagination from '@mui/material/Pagination';


const PublicPostbox = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [letters, setLetters] = useState([]); 
    const [hovered, setHovered] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 1페이지 디폴트
    const itemCnt = 8; // 한 페이지당 편지 수

    const lastLetter = currentPage * itemCnt; //페이지당 첫 번째 편지
    const firstLetter = lastLetter - itemCnt; //페이지당 마지막 편지
    const currentLetters = letters.slice(firstLetter, lastLetter); // 첫번째 편지부터 마지막 편지 전까지 자르기

    const pageChange = (event, page) => {
        setCurrentPage(page);
    };


    const letterPage = () => {
        const prevData = JSON.parse(localStorage.getItem('letterData') || '{}');

        const initLetterData = {
            letter_id: prevData.letter_id || null,
            sender_name: prevData.sender_name || "",
            sender_id: null, // 보낸 사람 ID는 null
        };

        localStorage.setItem('letterData', JSON.stringify(initLetterData));
        navigate("/writeLetter");
            
        };

    function letterView(letterId, senderName, senderId){
        navigate("/LetterView");
        const letterData = { letter_id: letterId, sender_name: senderName, sender_id: senderId}
        localStorage.setItem('letterData',JSON.stringify(letterData))
    }
    
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
            <button className="writeBtn" onClick={letterPage}><img src="/svg/addBtn_s.svg" alt="plusBtn img"/></button>
            
            <div className="letterList">
                {currentLetters.map((letter, i) => {
                    const color = letter.color || "white";
                    const closedSrc = `/svg/${color}Letter.svg`;
                    const openSrc = `/svg/${color}Open.svg`;

                    return (
                        <div
                            key={i}
                            className="letterItem"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => letterView(letter.id, letter.sender_name, letter.sender_id)}
                        >
                            <img
                                src={hovered === i ? openSrc : closedSrc}
                                alt="letteSvg"
                                className="letterSvg"
                            />
                            <h3 className="letterTitle">{letter.title}</h3>
                            <p className="letterSender">From: {letter.sender_name}</p>
                        </div>
                    );
                })}
            </div>

            {/* 하단 페이징네이션 */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0px" }}>
                <Pagination
                    sx={{
                        '& .MuiPaginationItem-root': { //sx는 mul내부 스타일링 시스템
                            fontSize: '1.3rem',   
                            width: '48px',       
                            margin: '0 5px',      
                        }
                    }}
                    count={Math.ceil(letters.length / itemCnt)}
                    page={currentPage}
                    onChange={pageChange}
                />
            </div>

      </div>
 

        
    );
};

export default PublicPostbox;
