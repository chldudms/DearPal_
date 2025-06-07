import React, { useState } from 'react';
import { stickerImages } from '../components/options.js';


function StickerBoard({ selectSticker }) {
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const stickersPerPage = 6; //한 페이지당 스티커 갯수

    const totalPages = Math.ceil(stickerImages.length / stickersPerPage);
    const startIndex = page * stickersPerPage; // 0 6 12 .... 각 첫번째 스티커
    const endIndex = startIndex + stickersPerPage;
    const crrSticker = stickerImages.slice(startIndex, endIndex); // 현재 스티커 페이지만 자르기

    const goPrev = () => { //이전 스티커 페이지
        if (page > 0) setPage(page - 1);
    };

    const goNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    return (
        <div className="stickerBoard">
            <img
                src="/svg/beforeScroll.svg"
                className="beforeScroll"
                onClick={goPrev}
                style={{
                    display: page === 0 ? 'none' : 'block', cursor: 'pointer'
                }} />

            <div className="sticker-grid">
                {crrSticker.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        className="stickerItem"
                        onClick={() => selectSticker(src)}
                    />
                ))}
            </div>

            <img
                src="/svg/stickerScroll.svg"
                className="stickerScroll"
                onClick={goNext}
                style={{
                    display: page === totalPages - 1 ? 'none' : 'block', cursor: 'pointer'
                }} />
        </div>
    );
}

export default StickerBoard;
