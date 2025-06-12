import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/letterView.css';
import { colorOptions } from '../constants/letterColor.js';
import LetterPaper from '../components/LetterPaper.js';
import ToolTip from '../components/ToolTip.js';
import CDPlayer from "../components/cdPlayer.js";
import { Playlist } from '../constants/playlist.js';

function LetterView() {
    const navigate = useNavigate();
    const [letterColor, setColor] = useState("");
    const [lineColor, setLine] = useState("#E3D7FF");
    const [letter, setLetter] = useState({ // 편지 오브젝트
        title: '', 
        content: '',
        stickers: [],
        image_url: null
    });
    const [mode, setMode] = useState("letter"); // letter | image
    const isUploaded = letter.image_url != null ? 1:0;
    const [musicTitle, setmusicTitle] = useState("") 
    const [artist, setArtist] = useState("")
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

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

    function findMusic(musicTitle) { // 뮤직 타이틀로 나머지 요소 찾기
        Playlist.forEach(item => {
            if (item.title === musicTitle) {
                setmusicTitle(musicTitle)
                setArtist(item.artist)
                setSelectedVideo(item.videoId)
            }
        })
    }


    // 편지지 컬러 설정 함수
    function setLetterColor(color) {
        const selected = colorOptions.find(c => c.id === color);
        if (selected) {
            setColor(selected.backgroundColor);
            setLine(selected.lineColor);
        }
    }

    const GoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    useEffect(() => {
        const letterData = JSON.parse(localStorage.getItem('letterData'));
        if (!letterData) {
            alert("편지 정보가 없습니다!");
            return;
        }
        
        //편지 읽기
        fetch(`http://localhost:5000/readLetter/${letterData.sender_name}/${letterData.letter_id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (!res.ok) throw new Error("편지 조회 실패");
                return res.json();
            })
            .then(data => {
                setLetter(data.letter);
                setLetterColor(data.letter.color);
                findMusic(data.letter.music)
          
            })
            .catch(error => {
                console.error( error.message);
                alert("편지 조회 실패");
            });

            
    }, []);

    return (
        <div className="letter-container">
            <LetterPaper
                page={'view'}
                mode={mode}
                uploadedImage={`http://localhost:5000${letter.image_url}`}
                letterColor={letterColor}
                lineColor={lineColor}
                title={letter.title}
                letterContent={letter.content}                   
           />

                {letter.stickers && (
                <div className="stickerPostition">
                     { letter.stickers.map((path, i) => (
                         <img key={i} src={`${process.env.PUBLIC_URL}${path}`} 
                        className={`letterSticker sticker-${i + 1}`}
                             alt=""
                             style={{ display: letter.stickers ? 'block' : 'none' }}                      />
                ))}   
                </div>)}

                <ToolTip
                    mode={mode}
                    setMode={setMode}
                isUploaded={isUploaded}
                 />

            {musicTitle&&

                <CDPlayer
                    selectedVideo={selectedVideo}
                    isPlaying={isPlaying}
                    title={musicTitle}
                    artist={artist}
                    playMusic={playMusic}
                    customTop="50px" 
                />
            }

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

            <button className="submitBtn" onClick={() => navigate("/Letter")}>
                딥장하기
            </button>

            <img src='/svg/arrowBtn.svg' className='propBtn' onClick={GoBack}/>

        </div>
    );
}

export default LetterView;
