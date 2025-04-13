import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const movepage = () => {
        navigate("/About");
    };

    return(
        <div>
            <div class="letterWrapper">
            <img src="/img/tape_pink.png"  className="tapeImg" alt="pink tape img"/>
            <img src="/img/letter.png" className="letterImg" alt="white letter img"/>
            </div>
            <h1>DEARPAL</h1>
         <h2>당신의 이야기를 편지로 남겨보세요.</h2>
         <button onClick={movepage}>start</button>
      </div>

      
    )
    
}


export default Home;