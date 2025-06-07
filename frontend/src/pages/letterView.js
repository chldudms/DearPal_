import React, { useState, useEffect } from 'react';
import '../styles/letterView.css';
import { colorOptions } from '../components/options.js';
import LetterPaper from '../components/LetterPaper.js';
import ToolTip from '../components/ToolTip.js';

function LetterView() {
    const [letterColor, setColor] = useState("");
    const [lineColor, setLine] = useState("#E3D7FF");
    const [letter, setLetter] = useState({ // 편지 오브젝트
        title: '', 
        content: '',
        stickers: [],
        image_url: null
    });
    const [mode, setMode] = useState("letter"); // letter | image
    const isUploaded = letter.image_url != null ? 1:0;

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
            <LetterPaper
                page={'view'}
                mode={mode}
                uploadedImage={`http://localhost:5000${letter.image_url}`}
                letterColor={letterColor}
                lineColor={lineColor}
                title={letter.title}
                letterContent={letter.content}                   
           />

                {letter.stickers && (
                <div className="stickerPostition">
                     { letter.stickers.map((path, i) => (
                         <img key={i} src={`${process.env.PUBLIC_URL}${path}`} 
                        className={`letterSticker sticker-${i + 1}`}
                             alt=""
                             style={{ display: letter.stickers ? 'block' : 'none' }}                      />
                ))}   
                </div>)}

                <ToolTip
                    mode={mode}
                    setMode={setMode}
                isUploaded={isUploaded}
                 />



        </div>
    );
}

export default LetterView;
