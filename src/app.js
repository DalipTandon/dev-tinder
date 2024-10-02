const express=require("express");
const app=express();


app.get("/",(req,res)=>{
    res.send("hello from server dashboard");
    
})
app.get("/profile",(req,res)=>{
    res.send("hello from server profile");
    
})
app.get("/demo",(req,res)=>{
    res.send("hello from server demo");
    
})

app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
    
})