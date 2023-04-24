const express = require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan =require("morgan");
const useRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")
const multer =require("multer")
const path=require("path")
const fs=require("fs")
// const bodyParser=require("body-parser")

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("connected to mongo");
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("common"));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        // const fileName=file.originalname;
        // console.log(req.body);
        cb(null,file.originalname);
    }
})

const upload =multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        fs.rename(`public/images/${req.file.filename}`,`public/images/${req.body.name}`,(err) => {
            if (err) throw err;
            // console.log('Rename complete!');
          })
        //  console.log(req.body);
        return res.status(200).json("file uploaded successfully");
    }catch(err){
        console.log(err);
    }
})

app.use("/api/users", useRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(8800,()=>{
    console.log("Backend server is running");
})