import Index from "./pages/index.js"
import PublicPostbox from "./pages/publicPostbox.js"
import LetterView from "./pages/letterView.js"
import Letter from "./pages/writeLetter.js"
import Profile from "./components/Profile.js"
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import MyPostbox from "./pages/myPostbox.js";
import WireLetter from "./pages/writeWireletter.js"
import React from "react";
import {Routes,Route,Link}from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import MusicPlayer from "./components/MusicPlayer.js"

function App() {

  
  return (
    
    <div className="App"> 
    
    <nav>
        
    </nav>

    <Routes>
        <Route path="/" element={<Index />}> </Route>
        <Route path="/PublicPostbox" element={<PublicPostbox />}> </Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/writeLetter" element={<Letter />}></Route>
        <Route path="/LetterView" element={<LetterView />}></Route>
        <Route path="/mypostbox" element={<MyPostbox />}></Route>
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/wireLetter" element={<WireLetter />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  
    </div>

   
  );
}

export default App;