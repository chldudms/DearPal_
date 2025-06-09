import {React,useState} from "react";
import Pagination from '@mui/material/Pagination';
import '../styles/publicPostbox.css'

function LetterList({ letters,letterView }){
    const [hovered, setHovered] = useState(null);
    const itemCnt = 8; // 한 페이지당 편지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 1페이지 디폴트

    const lastLetter = currentPage * itemCnt; //페이지당 첫 번째 편지
    const firstLetter = lastLetter - itemCnt; //페이지당 마지막 편지
    const currentLetters = letters.slice(firstLetter, lastLetter); // 첫번째 편지부터 마지막 편지 전까지 자르기


    const pageChange = (event, page) => {
        setCurrentPage(page);
    };
    return(
        <div className="letterList">
            {currentLetters.map((letter, i) => {
                const color = letter.color || "white";
                const closedSrc = `/svg/${color}_Letter.svg`;
                const openSrc = `/svg/${color}_open.svg`;

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
                            alt="letteSvg"
                            className="letterSvg"
                        />
                        <h3 className="letterTitle">{letter.title}</h3>
                        <p className="letterSender">From: {letter.sender_name}</p>
                    </div>
                );
            })}


            {/* 하단 페이징네이션 */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0px" }}>
                <Pagination
                    sx={{
                        '& .MuiPaginationItem-root': { //sx는 mul내부 스타일링 시스템
                            fontSize: '1.3rem',   // 숫자 크기
                            width: '48px',        // 버튼 너비
                            margin: '0 5px',      // 버튼 사이 간격
                        }
                    }}
                    count={Math.ceil(letters.length / itemCnt)}
                    page={currentPage}
                    onChange={pageChange}
                />
            </div>


        </div>
    )
}

export default LetterList;