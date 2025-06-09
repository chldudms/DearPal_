import React from "react";

function ToolTip({mode,setMode,isUploaded}){

    const changeMode = () => {
        setMode(prev => (prev === "letter" && isUploaded == true ? "image" : "letter"));
    };

    return (
        <div className="tooltip-container">
            <img
                src="/svg/contentChange.svg" className="contentChange" onClick={changeMode} alt="전환 버튼" />
            <span className="tooltipText">
                {mode === "letter" && isUploaded ? "사진 보기" : isUploaded == false ? "사진 없음 " : "편지 보기"}
            </span>
        </div>
        )
}

export default ToolTip;