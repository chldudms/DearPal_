import React, { useState, useEffect } from "react";
import '../styles/writeletter.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { colorOptions, stickerImages} from '../components/colorOptions.js';


function Letter() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [letterContent, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("white");
    const [letterColor, setColor] = useState("#FFFFFF");
    const [lineColor, setLine] = useState("#E3D7FF");
    const [userId, setUserId] = useState("");
    const [sticker,setSticker] = useState([]);
    const [modalDisplay, setModalDisplay] = useState("none");

    const openModal = () => setModalDisplay("block");
    const closeModal = () => setModalDisplay("none");

    
    function selectSticker(stickerImg) {
        setSticker(sticker => {
            const emptyIndex = sticker.findIndex(item => item === "");
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("토큰값:", token); // 토큰 제대로 저장됐는지 확인

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("디코딩 결과:", decoded);
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
       var today = new Date();
        console.log(title, letterContent)
       console.log( today)
       console.log('userId:', userId);


        if(title.length<=20&&letterContent.length>0){ 
             //편지 업로드 요청
            fetch('http://localhost:5000/addLetter', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId, title, letterContent, selectedColor })
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
                <div className="letter-paper" style={{ background: letterColor }}>
                    <input style={{ background: letterColor }}
                        value={title}
                        placeholder="제목을 입력하세요"
                        className="letter-title"
                        onChange={(e) => setTitle(e.target.value)} />
                    <hr style={{ background: lineColor }} />

                    <textarea
                        style={{ background: letterColor }}
                        value={letterContent}
                        placeholder="여기에 편지를 작성하세요..."
                        className="letter-content"
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button className="submitBtn" onClick={addLetter}>
                        완료
                    </button>

                </div>

                <div className="DecoContainer">
                    <img src="/img/sticker.png" className="stickerBtn" onClick={()=>modalDisplay=="block"?closeModal():openModal()} />
                    
                    <div className="stickerBoard" style={{display:modalDisplay}} >
                        <div className="sticker-grid">
                            {stickerImages.map((src, i) => (
                                <img key={i} src={src} className="stickerItem" onClick={()=>{selectSticker(src)}}/>
                            ))}
                        </div>
                    </div>

                    <img src="/img/image.png" className="stickerBtn"  />
                    <img src="/img/music.png" className="stickerBtn"  />


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

            </div>
         </div>
    );
}

export default Letter;