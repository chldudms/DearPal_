import React from "react"
import { Playlist } from "../constants/playlist.js"
import "../styles/musicModal.css"

function MusicPlayer({ selectedVideo, isPlaying, playMusic }) {

    
    return (
        <div className="music-player">
            <div className="playlist">
                {Playlist.map((music) => (
                    <div key={music.videoId} className="musicItem">
                        <div className="music-info">
                            <p className="title">{music.title}</p>
                            <p className="artist">{music.artist}</p>
                        </div>

                        <img
                            src={
                                selectedVideo === music.videoId && isPlaying
                                    ? "/svg/stop.svg"
                                    : "/svg/playing.svg"
                            }
                            className="playBtn"
                            onClick={() =>
                                playMusic(music.videoId, music.title, music.artist)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MusicPlayer
