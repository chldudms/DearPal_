import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from '.'
import "../styles/login.css" //login페이지와 같은 css사용

function Join() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [userPw, setUserPw] = useState();
    const [pwCheck, setPwCheck] = useState();

    function gotoJoin(){
        if(userPw==pwCheck){
            window.alert("가입 성공")
            navigate('/About')
        }
       else{
        window.alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
       }
    }

    return ( 
        <div>

            <Home />
            <div className='loginContainer'>

                <h3>회원가입</h3>

                <form className='loginform'>
                    <h5>id</h5>
                    <input className='userid' value={userId} onChange={(e) => setUserId(e.target.value)} /> <br />
                    <h5>password</h5>
                    <input className='userpw' type="password" value={userPw} onChange={(e) => setUserPw(e.target.value)} />
                    <h5>password check</h5>
                    <input className='userpw' type="password" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} />
                </form>

                <button className='blueBtn' onClick={gotoJoin}>완료</button>

                <p>  <br />회원이신가요?</p>

                <button className='pinkBtn' onClick={()=>navigate('/Login')}>로그인</button>

            </div>

        </div>

    )
}

export default Join;