const express=require("express");
const app=express();
const connectDB=require("./config/databse");
const User=require("./models/user");
const {signupValidation}=require("./utils/validation");
const { model } = require("mongoose");
const bcrypt = require('bcrypt'); // password encryption
const validator=require("validator"); //npm library for validations
const cookieParser=require("cookie-parser"); //npm library for reading cookies
const jwt = require('jsonwebtoken'); //for jwttokens
const{userAuthentication}=require("./middlewares/auth");
app.use(express.json());  //middleware to read  json data provided by express js
app.use(cookieParser());


app.post("/signup",async(req,res)=>{
   // console.log(req.body); //req.body is used to read data send via api 
    try{
        signupValidation(req);
        const{firstName,lastName,emailId,password}=req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const user=new User({
            firstName,lastName,emailId,password:hashPassword ,   //adding data via post api
        });
        await user.save();
        res.send("new user is created");
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }

})


app.post("/login",async(req,res)=>{
    const{emailId,password}=req.body;
    try{
    if(!validator.isEmail(emailId)){
        throw new Error("invalid email");
    }
    const user=await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Invalid credentails");
    }
    const isPassword=await bcrypt.compare(password,user.password);
    if(isPassword){
        var token = await jwt.sign({ _id: user._id }, "DEVTinder@1234hds",{expiresIn:"7d"});
        res.cookie("token",token);
        res.send("login successfull")   
     }else{
        throw new Error("invalid credentails")
    }
    
}catch(error){
    res.status(400).send("Error: "+error.message);
}
})


app.get("/profile",userAuthentication,async (req,res)=>{
    try{
    const user=req.user;
    
    res.send(user);
    
    }catch(error){
        res.status(400).send("ERROR :"+error.message);
    }
    
    
})

app.post("/sendConnectionRequest",userAuthentication,async(req,res)=>{
    const user=req.user;
    res.send(user.firstName  +" sent connecton sent!!!!");
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
