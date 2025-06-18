import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/letterChoice.css'; // 스타일 따로 만들 거면 이거 유지!

function LetterChoice() {
    const navigate = useNavigate();

    const handleSelect = (type) => {
        if (type === "card") {
            navigate("/writeletter");
        } else if (type === "wire") {
            navigate("/wireletter");
        }
    };

    const GoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div>
        <div className="letter-choice-container">
            <p className="letter-choice-title">편지 스타일을 선택해주세요.</p>
            <div className="letter-options">
                <div className="letter-option" onClick={() => handleSelect("card")}>
                    <img src="/svg/cardLetter.svg" alt="카드형 편지지" className="letterimg1" />
                    <p className="t">카드형</p>
                </div>
                <div className="letter-option" onClick={() => handleSelect("wire")}>
                    <img src="/svg/wireLetter.svg" alt="유선형 편지지" className="letterimg2" />
                    <p>유선형</p>
                </div>
            </div>
        </div>
            <img src='/svg/arrowBtn.svg' className='propBtn' onClick={GoBack} />

    </div>
    );
}

export default LetterChoice;
