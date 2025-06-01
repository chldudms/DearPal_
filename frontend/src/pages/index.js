import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/start.css'

function Home() {

    const navigate = useNavigate();

    // const movepage = (page) => {
    //     navigate(page);
    // };

    return (
        <div>
            <div class="letterWrapper">

                <img src="/svg/letter_purple.svg" className="letterImg" alt="white letter img" />
            </div>
            <img src="/svg/logo_purple.svg" className="logo" />
            <text className="submessage">당신의 이야기를 편지로 남겨보세요.</text>

            <div className="authpage">
                <button onClick={()=>navigate('/login')} className="loginBtn">로그인</button>
                <button onClick={() => navigate('/join')} className="joinBtn" >회원가입</button>
            </div>

        </div>
 
    )
}


export default Home;