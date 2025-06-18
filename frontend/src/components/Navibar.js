import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import ProfileModal from "./Profile";
import { jwtDecode } from "jwt-decode";

const Navibar = () => {
    const [isOpen, setOpen] = useState(false);
    const [seed, setSeed] = useState("");
    const [userId, setUserId] = useState("");
    const location = useLocation();
    const modalRef = useRef(null); // 모달 영역 감지용

    useEffect(() => { // 외부 클릭하면 모달 닫기 
        const ClickOutside = (e) => {
            if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", ClickOutside);
        return () => {
            document.removeEventListener("mousedown", ClickOutside);
        };
    }, [isOpen]);


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
    const isActive = (path) => location.pathname === path;

    return (
        <div>
            <div className="navbar">
                <img src="/svg/logo_purple.svg" className="navLogo" />
                <div className="navContent">
                    <Link
                        to="/publicPostBox"
                        className={isActive("/publicPostBox") ? "navItem active" : "navItem"}
                    >
                        공개 편지함
                    </Link>
                    <Link
                        to="/mypostBox"
                        className={isActive("/mypostBox") ? "navItem active" : "navItem"}
                    >
                        내 편지함
                    </Link>
                    <img
                        src={profileImg}
                        alt="유저 프로필"
                        onClick={() => setOpen(!isOpen)}
                        className="profile"
                    />
                    {isOpen && (
                        <div ref={modalRef} className="profile-modal-wrapper">
                            <ProfileModal onClose={() => setOpen(false)} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navibar;
