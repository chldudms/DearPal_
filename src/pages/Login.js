import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '.'
import "../styles/login.css"

function Login() {
    const navigate = useNavigate();

    return (
        <div>

            <Home />
            <div className='loginContainer'>

                <h3>로그인</h3>

                <form className='loginform'>


                    <h5>id</h5>
                    <input className='userid' ></input> <br />
                    <h5>password</h5>
                    <input className='userpw'></input>
                </form>

                <button className='loginBtn'>완료</button>
               
                <p>  <br />회원이 아니신가요?</p>

                <button className='joinBtn'>회원가입</button>

            </div>

        </div>

    )
}

export default Login;