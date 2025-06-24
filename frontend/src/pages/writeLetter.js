import React, { useState, useEffect, useRef } from "react";
import '../styles/writeletter.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { colorOptions, stickerImages} from '../constants/letterColor.js';
import StickerBoard from "../components/stickerBoard.js";
import FileInput from "../components/FileInput.js";
import StickerPostition from "../components/stickerPosition.js";
import LetterPaper from "../components/LetterPaper.js";
import ToolTip from "../components/ToolTip.js";
import MusicPlayer from "../components/MusicPlayer.js";
import CDPlayer from "../components/cdPlayer.js";
import { ModalOutsideClick } from '../hooks/modalOutside.js';

function Letter() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [letterContent, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("white");
    const [letterColor, setColor] = useState("#FFFFFF");
    const [lineColor, setLine] = useState("#E3D7FF");
    const [userId, setUserId] = useState("");
    const [receiverId, setReceiver] = useState("");
    const [sticker,setSticker] = useState([]);
    const [uploadedImage, setUploadedImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [rawFile, setRawFile] = useState(null); // 실제 파일
    const [musicTitle, setmusicTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [modals, setModals] = useState({ sticker: false, image: false, music: false, deleteModal: false });
    const [mode, setMode] = useState("letter"); // letter | image

    const stickerRef = useRef(null);
    const imageRef = useRef(null);
    const musicRef = useRef(null);

    ModalOutsideClick(modals, setModals, {
        stickerRef,
        imageRef,
        musicRef
    });
 
    const GoBack = () => {
        navigate(-1); // 이전 페이지로 이동
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


    function changeColor(colorId) {
        const selected = colorOptions.find(c => c.id === colorId);
        if (selected) {
            setColor(selected.backgroundColor);
            setLine(selected.lineColor);
            setSelectedColor(colorId);
        }
    }

    const playMusic = (videoId, newTitle, newArtist) => {
        setmusicTitle(newTitle)
        setArtist(newArtist)

        if (selectedVideo === videoId) {
            setIsPlaying((prev) => !prev)
        } else {
            setSelectedVideo(videoId)
            setIsPlaying(true)
        }
    }


    useEffect(() => {
        const letterData = JSON.parse(localStorage.getItem('letterData'));
        if (!letterData) {
            alert("편지 정보가 없습니다!");
            return;
        }
        setReceiver(letterData.sender_id)
        
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
       formData.append('receiver',receiverId)
       formData.append('title', title);
       formData.append('letterContent', letterContent);
       formData.append('selectedColor', selectedColor);
       formData.append('sticker', JSON.stringify(sticker));
       formData.append('musicTitle', musicTitle)
       formData.append('image', rawFile);
       formData.append('letter_type', "card")


        if(title.length<=20&&letterContent.length>0){ 
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
            window.alert("제목이 너무 깁니다. 20자 내외로 다시 입력해주세요.")
         }
                
    }
    

    return (
        <div >
            <div className="letter-container">
                <LetterPaper
                    page={'write'}
                    mode={mode}
                    isUploaded={isUploaded}
                    uploadedImage={uploadedImage}
                    letterColor={letterColor}
                    lineColor={lineColor}
                    title={title}
                    setTitle={setTitle}
                    letterContent={letterContent}
                    setLetterContent={setContent}
                />


                <button className="submitBtn" onClick={addLetter}>
                    완료
                </button>


                <div className="DecoContainer">
                    <img
                        src="/svg/heart.svg"
                        className="stickerBtn"
                        onClick={() => toggleModal("sticker")}
                    />
                    <img
                        src="/svg/image.svg"
                        className="ImgBtn"
                        onClick={() => toggleModal("image")}
                    />
                    <img
                        src="/svg/music.svg"
                        className="MusicBtn"
                        onClick={() => toggleModal("music")}
                    />
                </div>


                {modals.sticker && (
                    <div className="stickerModal" ref={stickerRef}>
                        <StickerBoard selectSticker={selectSticker} />
                    </div>
                )}

                {modals.image && (
                    <div className="imageModal" ref={imageRef}>
                        <FileInput
                            setIsUploaded={setIsUploaded}
                            setUploadedImage={setUploadedImage}
                            setRawFile={setRawFile}
                            uploadedImage={uploadedImage}
                            setMode={setMode}
                        />
                    </div>
                )}

                {modals.music && (
                    <div className="musicModal" ref={musicRef}>
                        <MusicPlayer
                            selectedVideo={selectedVideo}
                            isPlaying={isPlaying}
                            playMusic={playMusic}
                        />
                    </div>
                )}
            
            
            <StickerPostition
                sticker={sticker}
                setSticker={setSticker}
                className={"card"}
            />

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


                {selectedVideo && (
                    <CDPlayer
                        selectedVideo={selectedVideo}
                        isPlaying={isPlaying}
                        title={musicTitle}
                        artist={artist}
                        playMusic={playMusic}
                    />
                )}

                {selectedVideo && isPlaying && (
                    <div className="hidden-player">
                        <iframe
                            width="0"
                            height="0"
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=0&showinfo=0`}
                            allow="autoplay"
                            title="music-player"
                        ></iframe>
                    </div>
                )}


                <ToolTip 
                    mode={mode}
                    setMode={setMode}
                    isUploaded={isUploaded}   />

                <img src='/svg/arrowBtn.svg' className='propBtn' onClick={GoBack} />
            </div>

            {/* <h3 className="helptext">사진 비율은 최대 1280*720(2:1비율)을 권장합니다!  
            "모바일에서 업로드"를 이용해주세요</h3> */}
         </div>
    );
}

export default Letter;