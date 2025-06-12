import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from '.'
import "../styles/login.css" //login페이지와 같은 css사용

function Join() {
    const navigate = useNavigate();
    const [userName, setName] = useState();
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [pwCheck, setPwCheck] = useState();

    function gotoJoin() {
        if (userPw === pwCheck && userPw.trim().length != 0 && userId.trim().length != 0) {
            console.log(userName)
            fetch('http://localhost:5000/join', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({userName,userId,userPw })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === "회원가입 성공"&&data.token) {
                        window.alert("가입 성공")
                        localStorage.setItem('token', data.token); // 저장!
                        
                        // 저장 이후 바로 이동
                        setTimeout(() => {
                            navigate('/publicPostBox');
                        }, 0);  
                    } else {
                        window.alert(data.message);
                    }
                })
                .catch(err => {
                    console.error(err);
                    window.alert("서버 오류 발생");
                });
        } 
        else if (userPw.trim().length === 0 || userPw.trim().length === 0)
            {window.alert("아이디나 비밀번호를 입력하지 않았습니다.")}
        else {
            window.alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
        }
    }


    return ( 
        <div>

            <Home />
            <div className='JoinContainer'>

                <h3 className='authText'>회원가입</h3>

                <form className='Joginform'>
                    <div className="formGroup">
                        <label>NICKNAME</label>
                        <input className='userid' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label>ID</label>
                        <input className='userid' onChange={(e) => setUserId(e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label>PASSWORD</label>
                        <input className='userid' type='password' onChange={(e) => setUserPw(e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label>PASSWORD CHECK</label>
                        <input className='userid' type='password' onChange={(e) => setPwCheck(e.target.value)} />
                    </div>
                </form>

                <button className='blueBtn' onClick={gotoJoin}>완료</button>

                <p className="askText">회원이신가요?</p>

                <button className='pinkBtn' onClick={()=>navigate('/Login')}>로그인</button>

            </div>

        </div>

    )
}

export default Join;