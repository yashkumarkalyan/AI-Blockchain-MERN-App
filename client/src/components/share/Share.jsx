import "./share.css"
import { PermMedia,Label,Room,EmojiEmotions, Cancel, Feed } from "@mui/icons-material"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

export default function Share() {
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const desc=useRef();
    const [file,setFile]=useState(null);
    //---------------------------------------------
const [text,setText] = useState("");
const [output,setOutput] = useState("");
 
const checkHandler=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify([
      {
        "text": text
      }
    ]);
    setOutput("This tweek is ".concat(output["text"]))
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://yashkalyan.pythonanywhere.com/predict", requestOptions)
      .then(response => response.text())
      .then(result => setOutput(JSON.parse(result)))
      .catch(error => console.log('error', error));
      
}


    //----------------------------------------
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value,
        };
        if(file){
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("file",file);
            data.append("name",fileName);
            console.log(...data);
            newPost.img=fileName;
            try{
                await axios.post("/upload",data);
            }catch(err){
                alert(err.response.data);
            }
        }
        try{
            await axios.post("/posts",newPost);
            // Feed.location.reload();
        }catch(err){
            console.log(err);
        }
    }   
  return (
   <>
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture?PF+user.profilePicture:PF+"/persons/noavatar.png"} alt="" />
                <input onChange={(e)=>setText(e.target.value)}  placeholder={"What is in your mind "+user.username+"?"} id="text" className="shareInput"  ref={desc} />
            </div>
            <hr className="shareHr" />
            {file&&(
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancle" onClick={()=>setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                
                <button  className="checkButton" type="button" onClick={checkHandler} >Check</button>
                <button  className="shareButton" type="submit">Share</button>
                <p>{output["text"]}</p>
           
            </form>
        </div>
    </div>
    <p></p>
    </>
  )
}
