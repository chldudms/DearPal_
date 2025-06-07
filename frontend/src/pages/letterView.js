import React, { useState, useEffect } from 'react';
import '../styles/letterView.css';
import { colorOptions } from '../components/options.js';

function LetterView() {
    const [letterColor, setColor] = useState("");
    const [lineColor, setLine] = useState("");
    const [letter, setLetter] = useState({ // 편지 오브젝트
        title: '', 
        content: '',
        stickers: [],
        image_url: null
    });
    const [mode, setMode] = useState("letter"); // letter | image


    // 편지지 컬러 설정 함수
    function setLetterColor(color) {
        const selected = colorOptions.find(c => c.id === color);
        if (selected) {
            setColor(selected.backgroundColor);
            setLine(selected.lineColor);
        }
    }

    const changeMode = () => {
        setMode(prev => (prev === "letter" ? "image" : "letter"));
    };

    useEffect(() => {
        const letterData = JSON.parse(localStorage.getItem('letterData'));
        if (!letterData) {
            alert("편지 정보가 없습니다!");
            return;
        }

        fetch(`http://localhost:5000/readLetter/${letterData.sender_name}/${letterData.letter_id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (!res.ok) throw new Error("편지 조회 실패");
                return res.json();
            })
            .then(data => {
                setLetter(data.letter);
                setLetterColor(data.letter.color);

                console.log("스티커 데이터:", data.letter.stickers);
          
            })
            .catch(error => {
                console.error( error.message);
                alert("편지 조회 실패");
            });

            
    }, []);

    return (
        <div className="letter-container">
            <div className="letter-paper" style={{ background: letterColor }}>

                <text className="letter-title ">{letter.title}</text>
                <hr style={{ background: lineColor }} />

                {mode === "letter" ? (
                <text className="letter-content">{letter.content}</text>):
               (letter.image_url && (
          
                        <img
                            src={`http://localhost:5000${letter.image_url}`}
                            alt="편지 이미지"
                            className="ImagePreview"
                        />
                    )
                )}


            </div>
                {letter.stickers && letter.stickers.length > 0 && (
                <div className="stickerPostition">
                     { letter.stickers.map((path, i) => (
                         <img key={i} src={`${process.env.PUBLIC_URL}${path}`} 
                        className={`letterSticker sticker-${i + 1}`}
                             alt=""
                             style={{ display: letter.image_url ? 'block' : 'none' }}                      />
                ))}   
                </div>)}

            <div className="tooltip-container">
                <img
                    src="/svg/rightarrow.svg" className="arrowBtn" onClick={changeMode} alt="전환 버튼" />
                <span className="tooltipText">
                    {mode === "letter" ? "사진 전환" : "편지 전환"}
                </span>
            </div>


        </div>
    );
}

export default LetterView;
