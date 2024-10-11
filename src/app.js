const express=require("express");
const app=express();
const connectDB=require("./config/databse");
const User=require("./models/user");
const {signupValidation}=require("./utils/validation");
const { model } = require("mongoose");
const bcrypt = require('bcrypt');
const validator=require("validator");

app.use(express.json());  //middleware to read  json data provided by express js
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
    if(!isPassword){
        throw new Error("invalid credentails")
    }else{
        res.send("login successfull")
    }
    
}catch(error){
    res.status(400).send("Error: "+error.message);
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


app.delete("/user",async(req,res)=>{
    // const user=req.body.emailId; deleting user based on email id
    const user=req.body.userId;
    console.log(user);
    
    try{
        // await User.deleteOne({emailId:user}); deleting user basedon emailid
      await User.findByIdAndDelete(user);//deleting user by unique id
        res.send("User deleted successfully");
    }catch (error){
        res.status(404).send("something went wrong");
    }
})



app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const data=req.body;
    try{
        const IsAllowed=["firstName","lastName","emailId","age","gender","skills","profilUrl","password"];
        const isUpdateAllowed=Object.keys(data).every((k)=>IsAllowed.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }
        if(data.skills?.length >10){
            throw new Error("Skill limit exceeded")
        }
        await User.findByIdAndUpdate({_id:userId},data,{
            runValidators:true,
        });
        res.send("user data updated successfully");
    }catch(err){
        res.status(404).send("Update failed :"+err.message);
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
