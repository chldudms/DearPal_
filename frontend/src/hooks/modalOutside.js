import { useEffect } from "react";

export function ModalOutsideClick(modals, setModals, refs) {
    useEffect(() => {
        const listener = (e) => {
            const { stickerRef, imageRef, musicRef } = refs;

            if (modals.sticker && stickerRef.current && !stickerRef.current.contains(e.target)) {
                setModals(prev => ({ ...prev, sticker: false }));
            }
            if (modals.image && imageRef.current && !imageRef.current.contains(e.target)) {
                setModals(prev => ({ ...prev, image: false }));
            }
            if (modals.music && musicRef.current && !musicRef.current.contains(e.target)) {
                setModals(prev => ({ ...prev, music: false }));
            }
            
        };

        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [modals, refs, setModals]);
}

