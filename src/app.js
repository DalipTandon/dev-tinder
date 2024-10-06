const express=require("express");
const app=express();


app.get("/profile",(req,res,next)=>{
    console.log("first route");
    
    // res.send("hello from server profile1");
    next();
    
},(req,res,next)=>{
    console.log("second route");

    // res.send("hello from server profile2");
    next();

},(req,res,next)=>{
    console.log("third route");

    res.send("hello from server profile3");

})


app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
    
})