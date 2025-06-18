import React from 'react';
import '../styles/wireLetter.css'

function WirePaper({
    page,// 편지 작성 페이지 | 조회 페이지 
    mode,
    isUploaded,
    uploadedImage,
    letterColor,
    lineColor,
    title,
    setTitle,
    letterContent,
    setLetterContent,
}) {
    return (
        <div className="wire-paper" style={{ background: letterColor }}>
            {page === 'write' ? (
                <input
                    style={{ background: letterColor }}
                    value={title}
                    placeholder="제목을 입력하세요"
                    className="letter-title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            ) : (
                <div className="letter-title">{title}</div>
            )}

            <hr style={{ background: lineColor }} />

            {mode === "letter" ? (
                page === 'write' ? (
                    <textarea
                        style={{
                            overflow: "hidden",
                            backgroundColor: letterColor,
                            backgroundImage: `repeating-linear-gradient(
                        to bottom,
                        transparent,
                        transparent 38px,
                        ${"#8B8B8B"} 40px
                        )`,  backgroundSize: "100% 40px"
                        }}
                        value={letterContent}
                        placeholder="여기에 편지를 작성하세요..."
                        className="letter-content"
                        onChange={(e) => {
                            if (e.target.value.length <= 345) {
                                setLetterContent(e.target.value);
                            }
                        }}

                    />
                ) : (
                    <div>
                            <div
                                className="letter-content"
                                style={{
                                    backgroundColor: letterColor,
                                    backgroundImage: `repeating-linear-gradient(
                                    to bottom,
                                    transparent,
                                    transparent 38px,
                                    #8B8B8B 40px
                                    )`,
                                    backgroundSize: "100% 40px"
                                }}
                            >
                                {letterContent}
                            </div>
                    </div>
                )
            ) : (uploadedImage && (
                <div>
                    <img src={uploadedImage} className="ImagePreview" />
                </div>)
            )}

        </div>
    );
}

export default WirePaper;
