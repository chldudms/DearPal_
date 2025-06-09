import React from "react"
import "../styles/musicModal.css"

function CDPlayer({ selectedVideo, title, artist, isPlaying, playMusic, customTop }) {
    return (
        <div className="cdPlayer">

            <div className="selectedMusic" style={{
                top: customTop || "145px", 
            }}>
                <div className="music-info">
                    <p className="title">{title}</p>
                    <p className="artist">{artist}</p>

                    <img src="/svg/cd.svg" className={`cd ${isPlaying ? "spin" : ""}`} />

                    <img
                        src={isPlaying ? "/svg/stop.svg" : "/svg/playing.svg"}
                        className="playBtn"
                        onClick={() => playMusic(selectedVideo, title, artist)}
                    />

                </div>
               
            </div>
        </div>
    )
}

export default CDPlayer
