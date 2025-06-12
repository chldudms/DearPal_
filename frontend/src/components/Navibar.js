import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import ProfileModal from "../pages/Profile";
import { jwtDecode } from "jwt-decode";

const Navibar = () => {
    const [isOpen, setOpen] = useState(false);
    const [seed, setSeed] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);
                setSeed(decoded.profileSeed);
            
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        }
    }, []);

    const profileImg = `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;

    return (
        <div>
            <div className="navbar">
                <img src="/svg/logo_purple.svg" className="navLogo"/>
                <div className="navContent">
                    <Link to="/publicPostBox" id="h">열린 편지함</Link>
                    <Link to="/mypostBox">내 편지함</Link>
                    <img
                        src={profileImg}
                        alt="유저 프로필"
                        onClick={() => setOpen(!isOpen)}
                        className="profile"
                    />
                    {isOpen && <ProfileModal onClose={() => setOpen(false)} />}
                </div>
            </div>
        </div>
    );
};

export default Navibar;
