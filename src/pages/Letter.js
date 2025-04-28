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
        </div>
    );
}

export default Letter;