import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '.'
import "../styles/login.css"

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [userPw, setUserPw] = useState();

    const movepage = ()=>{

    }

    return (
        <div>

            <Home />
            <div className='loginContainer'>

                <h3>로그인</h3>

                <form className='loginform'>


                    <h5>id</h5>
                    <input className='userid' onChange={(e)=>setUserId(e.target.value)} ></input> <br />
                    <h5>password</h5>
                    <input className='userpw' onChange={(e) => setUserPw(e.target.value)} ></input>
                </form>

                <button className='blueBtn'>완료</button>
               
                <p>  <br />회원이 아니신가요?</p>

                <button className='pinkBtn' onClick={()=>navigate('/join')}>회원가입</button>

            </div>

        </div>

    )
}

export default Login;