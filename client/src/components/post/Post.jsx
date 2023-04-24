import "./post.css";
import { MoreVert, FavoriteBorder, Favorite, ModeCommentOutlined, PaidOutlined } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
// import { Users } from "../../dummyData";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import{TransferForm} from "../tip/Tip";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLike, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        } catch (err) {

        }
        setLike(isLike ? like - 1 : like + 1)
        setIsLike(!isLike)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "persons/noavatar.png"} alt="" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post.desc}
                    </span>
                    <img className="postImg" on src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" /> */}
                        <Checkbox className="likeIcon" icon={<FavoriteBorder />} onClick={likeHandler} checkedIcon={<Favorite />} />
                        <span className="postLikeCounter">{like} likes </span>
                    </div>
                    <div className="postBottomCenter">
                        <ModeCommentOutlined />
                        <span className="postCommentText">{post.comment}</span>
                    </div>
                    <div className="postBottomRight">
                        <PaidOutlined onClick={() => setShowPopup(true)} />
                        {showPopup && (
                            <div>

                                <div className='overlay' onClick={() => setShowPopup(false)} />

                                <div className='popup'>
                                    <button className='cancleButton' onClick={()=>setShowPopup(false)}>cancle the payment</button>

                                    <TransferForm popUp={showPopup} toAccount={post.tippingAccount}/>
                                </div>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
