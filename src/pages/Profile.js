import React, { useState } from "react";
import "../styles/profile.css";

function ProfileModal({ onClose }) {
    var randomSeed = () => {  //랜덤시드로 랜덤 프로필 주기 
        return Math.random().toString(36).substring(2, 10); //36진수로 변환 후 8글자 자르기 
    }

    const [seed, setSeed] = useState(randomSeed());

    const user = {
        name: "username",
        profileImg: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}`,
    };

    return (
        <div>

          
                <div className="profileModal">

                <button onClick={onClose} className="closeBtn">❌</button>

                <img src={user.profileImg} alt="프로필" className="profileImg" />
                <img src="img/shuffle.png" onClick={() => setSeed(randomSeed())} className="shuffleBtn"></img>

                <div className="profileText">
                    <h2 className="profileName">{user.name}</h2>
                </div>
                
                <button className="logoutBtn"> 로그아웃 </button>

                </div>
           



        </div>
    );
}

export default ProfileModal; 