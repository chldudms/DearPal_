import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import Input from "./pages/Input"
import Input2 from "./pages/Input2.js"
import List from "./pages/List"
import Letter from "./pages/Letter.js"
import Profile from "./pages/Profile.js"
import React from "react";
import {Routes,Route,Link}from "react-router-dom";
import { useMediaQuery } from 'react-responsive';


function App() {

  
  return (
    
    <div className="App"> 
    
    <nav>
        
    </nav>

    <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/About" element={<About />}> </Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/counter" element={<Counter />}> </Route>
        <Route path="/input" element={<Input />}> </Route>
        <Route path="/input2" element={<Input2 />}> </Route>
        <Route path="/list" element={<List />}> </Route>
        <Route path="/Letter" element={<Letter />} > </Route>
    </Routes>
  
    </div>

   
  );
}

export default App;