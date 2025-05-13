import React, { useState, useEffect } from "react";
import '../styles/writeletter.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function Letter() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [letterContent, setContent] = useState("");
    const [letterColor, setColor] = useState(""); //편지지 컬러
    const [lineColor, setLine] = useState("");
    const [selectedColor, setSelectedColor] = useState("white");
    const [userId, setUserId] = useState("");


    const colorOptions = [
        { id: "blue", img: "/img/circle_blue.png", selectedImg: "/img/checkblue.png" },
        { id: "pink", img: "/img/circle_pink.png", selectedImg: "/img/checkpink.png" },
        { id: "yellow", img: "/img/circle_yellow.png", selectedImg: "/img/checkyellow.png" },
        { id: "white", img: "/img/circle_white.png", selectedImg: "/img/checkwhite.png" },
    ];

    function changeColor(color) {

        if (color === "pink") {
            setColor("#FFCCE1");
            setLine("#F0A5AE")
            setSelectedColor(color)
        } else if (color === "yellow") {
            setColor("#F5EC8F");
            setLine("#E8D500")
            setSelectedColor(color)
        } else if (color === "white") {
            setColor("#ffffff");
            setLine("#ff0000")
            setSelectedColor(color)
        } else {
            setColor("#C8EAFC");
            setLine("#85CCFF")
            setSelectedColor(color)
        }

        function checkedButton() { }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");  // JWT 가져오기
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);  // payload에서 userId 꺼내기
            
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        }
    }, []); //deps[] 처음 한 번만 실행


   function addLetter(){
      
        console.log(title, letterContent)
        //편지 업로드 요청
            fetch('/addLetter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, letterContent, selectedColor, userId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === "편지 업로드 성공"){
                        console.log("편지 업로드 성공");
                        navigate("/About");
                    } else {
                        console.log(data.message);
                    }
                })
                .catch(err => {
                    console.error(err);
                    window.alert("서버 오류 발생");
                });
                
    }
    

    return (
        <div >
            <div className="letter-container">
                <div className="letter-paper" style={{ background: letterColor }}>
                    <input style={{ background: letterColor }}
                        value={title}
                        placeholder="제목을 입력하세요"
                        className="letter-title"
                        onChange={(e) => setTitle(e.target.value)} />
                    <hr style={{ background: lineColor }} />

                    <textarea
                        style={{ background: letterColor }}
                        value={letterContent}
                        placeholder="여기에 편지를 작성하세요..."
                        className="letter-content"
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button className="submitBtn" onClick={addLetter}>
                        편지 보내기
                    </button>

                </div>
                <div className="DecoContainer">
                    <button className="stickerBtn"> <img src="/img/sticker.png" /></button>
                    <button className="ImgBtn"> <img src="/img/image.png" /></button>
                    <button className="musicBtn"> <img src="/img/music.png" /></button>
                </div>

                <div className="letterColor">
                    {colorOptions.map((color) => (
                        <img
                            key={color.id}
                            src={selectedColor === color.id ? color.selectedImg : color.img}
                            alt={color.id}
                            onClick={() => changeColor(color.id)}
                            style={{ cursor: "pointer", width: "50px" }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Letter;