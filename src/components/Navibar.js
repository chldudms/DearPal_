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
            
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        }
    }, []);

    const profileImg = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}`;

    return (
        <div>
            <div className="navbar">
                <div className="logo">DEARPAL</div>
                <div className="navContent">
                    <Link to="/About" id="h">열린 편지함</Link>
                    <Link to="/List">내 편지함</Link>
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
