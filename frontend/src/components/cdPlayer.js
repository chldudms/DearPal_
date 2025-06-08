import React from "react"
import "../styles/musicModal.css"

function CDPlayer({ selectedVideo, title, artist, isPlaying, playMusic }) {
    return (
        <div className="cdPlayer">
            <img src="/svg/cd.svg" className={`cd ${isPlaying ? "spin" : ""}`} />

            <div className="selectedMusic">
                <div className="music-info">
                    <p className="title">{title}</p>
                    <p className="artist">{artist}</p>
                </div>
                <img
                    src={isPlaying ? "/svg/stop.svg" : "/svg/playing.svg"}
                    className="playBtn"
                    onClick={() => playMusic(selectedVideo, title, artist)}
                />
            </div>
        </div>
    )
}

export default CDPlayer
