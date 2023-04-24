import React from 'react'
import "./topbar.css";
import {Search,Person,Chat,NotificationAdd} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
  const user=useContext(AuthContext);
  console.log(user.user.username);

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{textDecoration:"none"}}>
        <span className="logo">Reactsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon"/>
          <input placeholder="Searchh for friend, post or any video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home Page</span>
          <span className="topbarLink">Time Line</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationAdd />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`profile/${user.user.username} `}>
        <img src={user.profilePicture?PF+user.profilePicture:PF+"persons/noavatar.png"}alt="" className="topbarImg" />
        </Link>
        <Link to={`profile/${user==null} `}>
        <img src={user.profilePicture?PF+user.profilePicture:PF+"persons/noavatar.png"}alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
