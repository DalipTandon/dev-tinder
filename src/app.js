const express=require("express");
const app=express();
const connectDB=require("./config/databse");
const User=require("./models/user");
const { model } = require("mongoose");

app.use(express.json());  //middleware to read  json data provided by express js
app.post("/signup",async(req,res)=>{
   // console.log(req.body); //req.body is used to read data send via api 
    const user=new User(req.body); //adding data via post api
    try{
        await user.save();
        res.send("new user is created");
    }catch(err){
        res.status(400).send("contact support team");
    }

})
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const user= await User.find({emailId:userEmail});
        if(user.length===0){
            res.status(404).send("user not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.send("something went wrond");
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(404).send("something went wrong");
    }
})
connectDB().then(()=>{
    console.log("DB is connected successfully");   
    app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
    
})
})
.catch((err)=>{
    console.log("DB is not connected successfully");
    
})
