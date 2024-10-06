const express=require("express");
const app=express();
const {adminAuthentication,userAuthentication}=require("./middlewares/auth");

app.use("/admin",adminAuthentication);
app.get("/admin/getAllData",(req,res)=>{
    res.send("All data fetched successfully");
})
app.get("/admin/deleteAllData",(req,res)=>{
    res.send("All data deleted successfully");
})
app.get("/user/getAllData",userAuthentication,(req,res)=>{
    res.send("All user data fetched successfully");
   
})

app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
    
})