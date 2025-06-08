import React, { useState } from "react";
import { Playlist } from "../constants/playlist.js";
import "../styles/musicModal.css"; // 스타일 분리

function MusicPlayer() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playMusic = (videoId) => {
        if (selectedVideo === videoId) {
            setIsPlaying((prev) => !prev);
        } else {
            setSelectedVideo(videoId);
            setIsPlaying(true);
        }
    };

    return (
        <div className="music-player">
            <div className="playlist">
                {Playlist.map((music) => (
                    <div key={music.videoId} className="musicItem">
                        <div className="music-info">
                            <p className="title">{music.title}</p>
                            <p className="artist">{music.artist}</p>
                        </div>

                        <img src={selectedVideo === music.videoId && isPlaying ? "/svg/stop.svg" : "/svg/playing.svg"}
                            className="playBtn"
                            onClick={() => playMusic(music.videoId)}
                        />
                       
                    </div>
                ))}


              
            </div>

            <div className="selectedMusic">
                <div className="music-info">
                    <p className="title">{selectedVideo}</p>
                    <p className="artist">{selectedVideo}</p>
                </div>
            </div>

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

            
        </div>
    );
}

export default MusicPlayer;
