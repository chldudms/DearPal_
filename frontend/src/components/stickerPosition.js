import { React, useRef } from "react";

function stickerPostition({ sticker, setSticker }){

    const removeSticker = (i) => {
        const newStickers = [...sticker];
        newStickers[i] = "";
        setSticker(newStickers);
    };

    return(
        <div className="stickerPostition">
            {sticker.map((src, i) => (
                <img key={i} src={src}
                    className={`letterSticker sticker-${i + 1}`}
                    style={{ display: src ? 'block' : 'none' }}
                    onClick={() => { removeSticker(i) }} />
            ))}
        </div>

    )
}
export default stickerPostition;