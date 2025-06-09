import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navibar";
import { jwtDecode } from "jwt-decode";
import Pagination from '@mui/material/Pagination';

const MyPostbox = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [letters, setLetters] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBox, setSelectedBox] = useState("received"); // 초기 화면 받은 편지

    const itemCnt = 8;
    const lastLetter = currentPage * itemCnt;
    const firstLetter = lastLetter - itemCnt;
    const currentLetters = letters.slice(firstLetter, lastLetter);

    const pageChange = (event, page) => {
        setCurrentPage(page);
    };

    function letterView(letterId, senderName) {
        navigate("/LetterView");
        const letterData = { letter_id: letterId, sender_name: senderName };
        localStorage.setItem('letterData', JSON.stringify(letterData));
    }

    useEffect(() => { 
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    useEffect(() => { // 받은 편지/ 보낸 편지 조회
        if (!userId) return;

        const endpoint =
            selectedBox === "sent"
                ? `http://localhost:5000/sentLetters/${userId}`
                : `http://localhost:5000/receivedLetters/${userId}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                if (data.letters) {
                    setLetters(data.letters);
                    console.log(data.letters)
                }


            })
            .catch(err => {
                console.error("편지 로딩 에러:", err);
                window.alert("편지를 불러오는 중 오류 발생!");
            });

    }, [userId, selectedBox]); // 바뀔때마다 재실행

    return (
        <div>
            <Navibar />

            <div className="letterOption">
                <span
                    onClick={() => setSelectedBox("received")}
                    className={selectedBox === "received" ? "option selected" : "option"} >
                    받은 편지함 </span>

                <div className="divider"></div>

                <span
                    onClick={() => setSelectedBox("sent")}
                    className={selectedBox === "sent" ? "option selected" : "option"} >
                    보낸 편지함 </span>
            </div>


            {/* 편지 리스트 */}
            <div className="letterList">
                {currentLetters.map((letter, i) => {
                    const color = letter.color || "white";
                    const closedSrc = `/svg/${color}_Letter.svg`;
                    const openSrc = `/svg/${color}_open.svg`;

                    //  받은 편지면 sender, 보낸 편지면 receiver
                    const name = selectedBox === "sent" ? letter.receiver_name : letter.sender_name;

                    return (
                        <div
                            key={i}
                            className="letterItem"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => letterView(letter.id, letter.sender_name)}
                        >
                            <img
                                src={hovered === i ? openSrc : closedSrc}
                                alt="letterSvg"
                                className="letterSvg"
                            />
                            <h3 className="letterTitle">{letter.title}</h3>
                            <p className="letterSender">{selectedBox == "received" ?"From. ":"To. "}{name}</p>
                        </div>
                    );
                })}
            </div>

            {/* 페이징 */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0px" }}>
                <Pagination
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: '1.3rem',
                            width: '48px',
                            margin: '0 5px',
                        }
                    }}
                    count={Math.ceil(letters.length / itemCnt)}
                    page={currentPage}
                    onChange={pageChange}
                />
            </div>
            
        </div>
    );
};

export default MyPostbox;
