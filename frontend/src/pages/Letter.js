import React, { useState, useEffect, useRef } from "react";
import '../styles/writeletter.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { colorOptions, stickerImages} from '../components/options.js';


function Letter() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [letterContent, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("white");
    const [letterColor, setColor] = useState("#FFFFFF");
    const [lineColor, setLine] = useState("#E3D7FF");
    const [userId, setUserId] = useState("");
    const [sticker,setSticker] = useState([]);
    const [modals, setModals] = useState({ sticker: false, image: false, music: false, deleteModal:false});
    const [uploadedImage, setUploadedImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [mode, setMode] = useState("letter"); // letter | image
    const [rawFile, setRawFile] = useState(null); // 실제 파일


    const changeMode = () => {
        setMode(prev => (prev === "letter" ? "image" : "letter"));
    };

    const delImgModal= ()=>{

    }

    const fileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file)); // 프리뷰 
            setRawFile(file); // 나중에 서버로 전송
            setIsUploaded(true);
            console.log(uploadedImage)
        }
    };



    const toggleModal = (key) => {
        setModals((prev) => {
            const allFalse = Object.keys(prev).reduce((acc, k) => { //오브젝트 키만 뽑아서 순회
                acc[k] = false; // 모달 모두 닫은 후 
                return acc;
            }, {});
            return {
                ...allFalse,
                [key]: !prev[key]  //현재 눌린 거만 
            };
        });
    };


    const closeAllModals = () => {
        setModals({
            sticker: false,
            image: false,
            music: false
        });
    };

    
    function selectSticker(stickerImg) {
        setSticker(sticker => {
            const emptyIndex = sticker.findIndex(item => item === ""); //빈자리 찾아서 삽입
            if (emptyIndex !== -1) {
                const newArr = [...sticker];
                newArr[emptyIndex] = stickerImg;
                return newArr;
            }

            if (sticker.length < 3) {
                return [...sticker, stickerImg];
            }

            return sticker;
        });
    }

    const removeSticker = (i) => {
        const newStickers = [...sticker];
        newStickers[i] = "";
        setSticker(newStickers);
    };


    function changeColor(colorId) {
        const selected = colorOptions.find(c => c.id === colorId);
        if (selected) {
            setColor(selected.backgroundColor);
            setLine(selected.lineColor);
            setSelectedColor(colorId);
        }
    }

    const ref = useRef(null);

    const ClickUploadButton = () => {
        if (!ref.current) return;
        ref.current.click();
        setMode("Image");
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("토큰값:", token); // 토큰 제대로 저장됐는지 확인

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("유저 아이디:", decoded.userId); 
                
                setUserId(decoded.userId);
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        } else {
            console.log("토큰이 로컬스토리지에 없음");
        }
    }, []);


   function addLetter(){
       const formData = new FormData();
       formData.append('userId', userId);
       formData.append('title', title);
       formData.append('letterContent', letterContent);
       formData.append('selectedColor', selectedColor);
       formData.append('sticker', JSON.stringify(sticker));
       formData.append('image', rawFile);


        if(title.length<=30&&letterContent.length>0){ 
             //편지 업로드 요청
            fetch('http://localhost:5000/addLetter', {
                     method: 'POST',
                     body: formData
                 })
                     .then(res => res.json())
                     .then(data => {
                         if (data.message === "편지 업로드 성공"){
                             console.log("편지 업로드 성공");
                             navigate("/publicPostBox");
                         } else {
                             console.log(data.message);
                         }
                     })
                     .catch(err => {
                         console.error(err);
                         window.alert("서버 오류 발생");
                     });}
        else if(letterContent.length==0){
            window.alert("편지 내용을 입력하세요!")
        }
        else if(title.length==0){
            window.alert("제목을 입력하세요!")

        }
         else{
            window.alert("제목이 너무 깁니다. 30자 내외로 다시 입력해주세요.")
         }
                
    }
    

    return (
        <div >
            <div className="letter-container">
                <div className="letter-paper" style={{ background: letterColor }}>
                    <input style={{ background: letterColor }}
                        value={title}
                        placeholder="제목을 입력하세요"
                        className="letter-title"
                        onChange={(e) => setTitle(e.target.value)} />
                    <hr style={{ background: lineColor }} />

                {mode === "letter" ? (
                        <textarea
                            style={{ background: letterColor }}
                            value={letterContent}
                            placeholder="여기에 편지를 작성하세요..."
                            className="letter-content"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                         isUploaded && uploadedImage && (
                          <div>
                           <img src={uploadedImage} className="ImagePreview" onClick={()=>toggleModal("deleteImgModal")} />
                          </div>
                        )
                    )}


                    <button className="submitBtn" onClick={addLetter}>
                        완료
                    </button>

                </div>

                <div className="DecoContainer">
                    <img
                        src="/svg/heart.svg"
                        className="stickerBtn"
                        onClick={() => toggleModal("sticker")}
                    />

                    {modals.sticker && (
                        <div className="stickerBoard">
                            <div className="sticker-grid">
                                {stickerImages.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        className="stickerItem"
                                        onClick={() => selectSticker(src)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
          

                 
                   { modals.image && (
                    <div className="imageModal">
                        <img src="/svg/upload.svg" className="uploadBtn" onClick={ClickUploadButton} />
                            <input type="file" hidden ref={ref} onChange={fileChange} />

                    </div>
                    )}

                    <img src="/img/image.png" className="ImgBtn" onClick={() => toggleModal("image")} />
                                     
                    <img src="/img/music.png" className="MusicBtn"  onClick={() => toggleModal("music")} />
                    {modals.music && (
                        <div className="musicModal">
                        </div>
                    )}
                </div> 
                
         
               <div className="stickerPostition">
                    {sticker.map((src, i) => (
                     <img key={i} src={src} 
                     className={`letterSticker sticker-${i + 1}`}
                     onClick={() => {removeSticker(i) }}/> 
                    ))}
                </div>


                <div className="letterColor">
                    {colorOptions.map((color) => (
                        <img
                            key={color.id}
                            src={selectedColor === color.id ? color.selectedImg : color.img}
                            alt={color.id}
                            onClick={() => changeColor(color.id)}
                            style={{ cursor: "pointer", width: "50px" }}
                        />
                    ))}
                </div>

                <div className="tooltip-container">
                    <img
                        src="/svg/rightarrow.svg" className="arrowBtn"  onClick={changeMode} alt="전환 버튼"  />
                    <span className="tooltipText">
                        {mode === "letter" ? "사진 전환" : "편지 전환"}
                    </span>
                </div>

            </div>

            <div className="Modals">
                {/* <div className="deleteImgModal"> 
                <p>사진을 삭제하겠습니까?</p>
                </div>    */}
            </div>
         </div>
    );
}

export default Letter;