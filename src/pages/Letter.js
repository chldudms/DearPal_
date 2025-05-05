import React, { useState } from "react";
import '../styles/writeletter.css'

function Letter() {

    const [title, setTitle] = useState("");
    const [letterContent, setContent] = useState("");
    const [letterColor, setColor] = useState(""); //편지지 컬러
    const [lineColor, setLine] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

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

                    <button className="submitBtn">
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