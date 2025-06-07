import React from "react";

function ToolTip({mode,setMode,isUploaded}){

    const changeMode = () => {
        setMode(prev => (prev === "letter" && isUploaded == true ? "image" : "letter"));
    };

    return (
        <div className="tooltip-container">
            <img
                src="/svg/rightarrow.svg" className="arrowBtn" onClick={changeMode} alt="전환 버튼" />
            <span className="tooltipText">
                {mode === "letter" && isUploaded ? "사진 전환" : isUploaded == false ? "첨부된 사진이 없습니다. " : "편지 전환"}
            </span>
        </div>
        )
}

export default ToolTip;