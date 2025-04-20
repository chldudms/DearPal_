import Index from "./pages/index.js"
import About from "./pages/About"
import List from "./pages/List"
import Letter from "./pages/Letter.js"
import Profile from "./pages/Profile.js"
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Start from "./pages/start.js";
import React from "react";
import {Routes,Route,Link}from "react-router-dom";
import { useMediaQuery } from 'react-responsive';


function App() {

  
  return (
    
    <div className="App"> 
    
    <nav>
        
    </nav>

    <Routes>
        <Route path="/" element={<Index />}> </Route>
        <Route path="/About" element={<About />}> </Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/start" element={<Start/>}></Route>
        <Route path="/join" element={<Join />}></Route>

        <Route path="*" element={<h1>404 Not Found 😭</h1>} />


    </Routes>
  
    </div>

   
  );
}

export default App;