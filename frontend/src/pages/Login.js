import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '.'
import "../styles/login.css"

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

   function gotoLogin(){
        console.log(userId,userPw);

       // 로그인 성공 후 받은 토큰을 로컬스토리지에 저장
       if (userPw.length >= 1 && userId.length >=1){
       fetch('http://localhost:5000/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ userId, userPw })
       })
           .then(res => res.json())
           .then(data => {
               if (data.message === "로그인 성공"&&data.token) {
                   localStorage.setItem('token', data.token);  // 로컬스토리지에 저장
                   navigate('/publicPostBox');  // 페이지 이동
               } else {
                   window.alert(data.message);
               }
           })
           .catch(err => {
               console.error(err);
               window.alert("서버 오류 발생");
           });
   }
       else
       { window.alert("아이디나 비밀번호를 입력하지 않았습니다.") }
    }

    return (
        <div>

            <Home />
            <div className='loginContainer'>
                <h3 className='authText'>로그인</h3>

                <div className="formGroup">
                    <label htmlFor="userid">ID</label>
                    <input id="userid" className="userid" onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="userpw">PASSWORD</label>
                    <input id="userpw" type='password' className="userpw" onChange={(e) => setUserPw(e.target.value)} />
                </div>

                <button className='blueBtn' onClick={gotoLogin}>완료</button>

                <p className="askText">회원이 아니신가요?</p>
                <button className='pinkBtn' onClick={() => navigate('/join')}>회원가입</button>
            </div>


        </div>

    )
}

export default Login;