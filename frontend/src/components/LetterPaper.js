import React from 'react';

function LetterPaper({
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
        <div className="letter-paper" style={{ background: letterColor }}>
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
                    style={{ background: letterColor }}
                    value={letterContent}
                    placeholder="여기에 편지를 작성하세요..."
                    className="letter-content"
                    onChange={(e) => setLetterContent(e.target.value)}
                />
            ) : (
                <div>
                <div className="letter-content">{letterContent}</div> 
               </div>
            )
            ) : (uploadedImage && (
            <div>
                <img src={uploadedImage} className="ImagePreview" />
            </div> )
    )}

        </div>
    );
}

export default LetterPaper;
