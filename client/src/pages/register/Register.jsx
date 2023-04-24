import "./register.css"
import { useRef } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register() {
    const username=useRef();
    const password=useRef();
    const payableAccount=useRef();
    const email=useRef();
    const passwordAgain=useRef();
    const history=useNavigate();

    const handleClick=async(e)=>{
        e.preventDefault();
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("Password Don't match enter right password");
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                payableAccount:payableAccount.current.value,
                password:password.current.value,

            }
            try{

             await axios.post("/auth/register",user);
             history("/login");
                
            }catch(err){
                console.log(err);
            }
        }
    }

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">ReactSocial</h3>
                <span className="registerDesc">
                    Connect with Friends and the world.
                </span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Username" required className="registerInput" ref={username}/>
                    <input placeholder="Email" type="email" required className="registerInput" ref={email}/>
                    <input placeholder="Payable Georli account" required className="registerInput" ref={payableAccount}/>
                    <input placeholder="Password" type="password" required minLength="6" className="registerInput" ref={password}/>
                    <input placeholder="Password Again" type="password" required minLength="6" className="registerInput" ref={passwordAgain}/>
                    <button className="signupButton" type="submit">Sign Up</button>
                    <Link to="/login">
                    <button className="registerButton">Log into Your Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
