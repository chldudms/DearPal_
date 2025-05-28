import React, {useState, useEffect} from 'react';
import '../styles/letterView.css'

function LetterView(){
    const [letterColor, setColor] = useState(""); //편지지 컬러
    const [lineColor, setLine] = useState("");
    const [letter, setLetter] = useState({});

    function setLetterColor(color){
        if (color === "pink") {
            setColor("#FFCCE1");
            setLine("#F0A5AE")
        } else if (color === "yellow") {
            setColor("#F5EC8F");
            setLine("#E8D500")
        } else if (color === "white") {
            setColor("#ffffff");
            setLine("#ff0000")
        } else {
            setColor("#C8EAFC");
            setLine("#85CCFF")
        }
    }

     useEffect(()=>{
        const letterData = JSON.parse(localStorage.getItem('letterData')); //스토리지에서 편지 정보 가져오기
        
        console.log(letterData.sender_name)
         //sender_name과 letter_id를 통해 편지 내용 조회 
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
                 console.log(data.letter)
                 
             })
             .catch(error => {
                 console.error("에러:", error.message);
                 alert("편지 조회에 실패했어요");
             });
     }, [])

     
        
    return(
    <div>
        <div className="paper" style={{ background: letterColor }}>  
              
            <text className="Title">{letter.title}</text>
            <hr style={{ background: lineColor }} />
            <text className="Content">{letter.content} </text>
            
        </div>
    </div>
    );

}
export default LetterView;