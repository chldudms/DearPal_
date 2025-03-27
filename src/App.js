import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import Input from "./pages/Input"
import Input2 from "./pages/Input2.js"
import List from "./pages/List"
import React from "react";
import {Routes,Route,Link}from "react-router-dom";

function App() {
  return (
    <div className="App"> 
    
    <nav>
        <Link to="/">Home</Link> | <Link to="/About">About</Link>
        | <Link to="/counter">Counter</Link>   
        | <Link to="/input">Input</Link>   | <Link to="/input2">Input2</Link> 
        | <Link to="/list">List</Link> 
    </nav>

    <Routes>d
        <Route path="/" element={<Home />}> </Route>
        <Route path="/About" element={<About />}> </Route>
        <Route path="/counter" element={<Counter />}> </Route>
        <Route path="/input" element={<Input />}> </Route>
        <Route path="/input2" element={<Input2 />}> </Route>
        <Route path="/list" element={<List />}> </Route>
    </Routes>
  
    </div>

   
  );
}

export default App;