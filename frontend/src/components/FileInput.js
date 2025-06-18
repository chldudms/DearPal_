import { React, useRef } from "react";

function FileInput({setIsUploaded,setUploadedImage,uploadedImage,setRawFile,setMode}){
    const ref = useRef(null);

    const fileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file)); // 프리뷰 
            setRawFile(file); // 나중에 서버로 전송
            setIsUploaded(true);
            console.log(uploadedImage)
        }
    };

    const ClickUploadButton = () => {
        if (!ref.current) return;
        ref.current.click();
        setMode("Image");
    };


return(
    <div className="imageModal">
        <img src="/svg/upload.svg" className="uploadBtn" onClick={ClickUploadButton} />
        <input type="file" hidden ref={ref} onChange={fileChange} />
    </div>
)
}

export default FileInput;