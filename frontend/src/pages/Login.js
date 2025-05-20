import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '.'
import "../styles/login.css"

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [userPw, setUserPw] = useState();

   function gotoLogin(){
        console.log(userId,userPw);

       // 로그인 성공 후 받은 토큰을 로컬스토리지에 저장
       fetch('/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ userId, userPw })
       })
           .then(res => res.json())
           .then(data => {
               if (data.token) {
                   localStorage.setItem('token', data.token);  // 로컬스토리지에 저장
                   navigate('/About');  // 페이지 이동
               }
           });

      if(userId.length===0)
        window.alert("아이디가 입력되지 않았습니다. ")
    }

    return (
        <div>,


            <Home />
            <div className='loginContainer'>

                <h3>로그인</h3>

                <form className='loginform'>


                    <h5>id</h5>
                    <input className='userid' onChange={(e)=>setUserId(e.target.value)} ></input> <br />
                    <h5>password</h5>
                    <input className='userpw' onChange={(e) => setUserPw(e.target.value)} ></input>
                </form>

                <button className='blueBtn' onClick={gotoLogin}>완료</button>
               
                <p>  <br />회원이 아니신가요?</p>

                <button className='pinkBtn' onClick={()=>navigate('/join')}>회원가입</button>

            </div>

        </div>

    )
}

export default Login;