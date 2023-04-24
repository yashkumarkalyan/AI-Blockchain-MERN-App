const router =require("express").Router();
const Post=require("../models/Post");
const User = require("../models/User");
const ethers =require("ethers");
//create a post
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
    const user= await User.findById(req.body.userId);
    // if(user.payableAccount===req.body.tippingAccount){
    try{
        newPost.tippingAccount=user.payableAccount;
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
    // }else{
    //     console.log("tipping account should be same as user's tipping account");
    // }
})
//update a post
router.put("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);

        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("post has been updated");
        }else{
            res.status(403).json("you can update only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//delete a post
router.delete("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);

        if(post.userId===req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("post has been deleted");
        }else{
            res.status(403).json("you can delete only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//like/dislike a post
router.put("/:id/like",async(req,res)=>{
    try{

        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("post has been liked");
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("post has been disliked");       
        }
    }catch(err){
        res.status(500).json(err);
    }

})
//get a post
router.get("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
//get timeine post
router.get("/timeline/:userId",async(req,res)=>{
    try{
        const currentUser=await User.findById(req.params.userId);
        const userPosts=await Post.find({userId:currentUser._id});
        const friendsPost=await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendsPost))
    }catch(err){
        res.status(500).json(err);
    }
})
//get user' all posta
router.get("/profile/:username",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.params.username})
        const posts=await Post.find({userId:user._id});
        res.status(200).json(posts);

    }catch(err){
        res.status(500).json(err);
    }
})
//tiping
// router.put("/:id/tip",async(req,res)=>{
//     try{
//         const post=await Post.findById(req.params.id);
//         if(window.ethereum){
//             await window.ethereum.send({method: "eth_requestAccounts"});
//             const provider= new ethers.providers.Web3Provider(window.ethereum);
//             const signer=provider.getSigner();
//             const tx=await signer.sendTransaction({
//                 to:post.tippingAccount,
//                 value:ethers.utils.parseEther(req.body.value)
//             })
//             res.status(200).json(tx);
//         }
//     }catch(err){
//         res.status(500).json(err);
//     }
// })


module.exports=router;