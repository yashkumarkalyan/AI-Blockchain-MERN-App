import "./rightbar.css"
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const [friends,setFriends]=useState([]);
  const {user:currentUser,dispatch} =useContext(AuthContext);
  const[followed,setFollowed]=useState(currentUser.followings.includes(user?._id));

//  useEffect(()=>{
//   setFollowed();
//  },[currentUser.followings,user._id])

  const followHandler=async()=>{
    try{
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id})
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id})

      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed)
  }
   useEffect(()=>{
        const getFriends=async()=>{
          try{
            const friendList=await axios.get(`/users/friends/${user._id}`)
            setFriends(friendList.data);
          }catch(err){
            console.log(err);
          }
        }
        getFriends();
      },[user]);
  const HomeRightbar = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText"><b>yo yo honey singh </b>and <b>3 other friends</b> have birthday today</span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}

        </ul>
      </>
    );
  };
  
  const ProfileRightbar = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
      <>
      {user.username!==currentUser.username&&(
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed?"Unfollow":"Follow"}
          {followed?<Remove/>:<Add/>}
        </button>
      )}
        <h4 className="rightbarTitle"> User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoValue">{user.country}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">State:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===2?"Married":"empty"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle"> user Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend)=>(
            <Link  to={`/profile/${friend.username}`} style={{textDecoration:"none"}}>
            <div key={friend._id} className="rightbarFollowing">
            <img src={friend.profilePicture?PF+friend.profilePicture:PF+"persons/noavatar.png"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
