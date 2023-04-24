import { useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import {Register} from "../register/Register"
import { Link } from "react-router-dom";

export default function Login() {
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch} =useContext(AuthContext);

    const handleClick=(e)=>{
        e.preventDefault();
        try{
            loginCall({email:email.current.value,password:password.current.value},dispatch);

        }catch(error){
            console.log(error);
        }
    };

    console.log(user);

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">ReactSocial</h3>
                <span className="loginDesc">
                    Connect with Friends and the world.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?(<CircularProgress color="inherit"/>):( "Log In")}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <Link to ="/register">
                    <button className="loginRegisterButton">{isFetching?(<CircularProgress color="inherit"/>):( "Create a new account")}</button>
                    </Link>
                    </form>


            </div>
        </div>
    </div>
  )
}
