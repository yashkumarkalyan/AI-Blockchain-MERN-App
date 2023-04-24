const { default: mongoose } = require("mongoose");
const mpngoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        max:50,
        unique:true,
    },
    payableAccount:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
        min:6,
        
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    country:{
        type:String,
        default:"empty",
    },
    city:{
        type:String,
        default:"",
    },
    from:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50,
        
    },
    city:{
        type:String,
        max:50,
    },
    from:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
    },
    tippingHistory:{
        type:Array,
        default:[],
    },
    
},
{timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);