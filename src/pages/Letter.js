import React from "react";
import '../styles/writeletter.css'

function Letter(){
   
    return (

        
        <div className="letter-container">

            <div className="letter-paper">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="letter-title"  />
                <textarea
                    placeholder="여기에 편지를 작성하세요..."
                    className="letter-content"/>

                <button className="submitBtn">
                    편지 보내기
                </button>
                
            </div>

        <div className="DecoContainer">
            <button className="stickerBtn"> <img src="/img/sticker.png" /></button>
            <button className="ImgBtn"> <img src="/img/Image.png" /></button>
            <button className="musicBtn"> <img src="/img/Music.png" /></button>
        </div>

        <div className="letterColor">
         <img src="/img/circle_blue.png" className="colorPink"/>
         <img src="/img/circle_pink.png" className="colorBlue" />
         <img src="/img/circle_yellow.png" />
         <img src="/img/circle_white.png" />
        </div>

        </div>
        
    );
}

export default Letter;