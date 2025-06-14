import React, { useState, useEffect } from "react"; 
import "../styles/profile.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

var randomSeed = () => {  //랜덤시드로 랜덤 프로필 주기 
    return Math.random().toString(36).substring(2, 10); //36진수로 변환 후 8글자 자르기 
}


function ProfileModal({ onClose }) {
    
    const navigate = useNavigate();

    const [seed, setSeed] = useState("");
    const [userName, setUserName] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("token");  // JWT 가져오기
        
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.userName);  // payload에서 userId 꺼내기
                setSeed(decoded.profileSeed);
                console.log(userName) 
                
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        }
    }, []); //deps[] 처음 한 번만 실행


    const user = {
        name: userName || "알 수 없음",
        profileImg: `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`,
    };

    function logout(){
   
        localStorage.removeItem("token");
        alert("로그아웃 되었습니다.");

        setUserName("");       // userId 상태도 초기화
        setSeed(""); // 새 시드로 리셋해줘야 다음 로그인에 반영됨

        navigate("/Login")
    }


    return (
        <div>
                <div className="profileModal">

                {/* <button onClick={onClose} className="closeBtn">X</button> */}

                <img src={user.profileImg} alt="프로필" className="profileImg" />
                {/* <img src="img/shuffle.png" onClick={() => setSeed(randomSeed())} className="shuffleBtn"></img> */}

                <div className="profileText">
                    <h2 className="profileName">{user.name}</h2>
                </div>
                
                <button className="logoutBtn" onClick={logout}> 로그아웃 </button>

                </div>

        </div>
    );
}

export default ProfileModal; 