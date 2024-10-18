const express=require("express");
const requestRouter=express.Router();
const{userAuthentication}=require("../middlewares/authentication");
const User=require("../models/user");
const connectionRequest=require("../models/connectionRequesst")

requestRouter.post("/request/send/:status/:toUserId",userAuthentication,async(req,res)=>{
   try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowed=["interested","rejected"];
    if(!allowed.includes(status)){
        return res.status(400).send({
            message:"Invalid status",
        });
    }
    const user=await User.findById(toUserId);
    if(!user){
        return res.status(400).send({
            message:"Invalid user connection",
        })
    }
    const exisitingUser=await connectionRequest.findOne({
        $or:[
            {toUserId,fromUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ]
    })
        if(exisitingUser){
      return res.status(400).send({
        message:"Invalid request",
     })
        }

    const connection=new connectionRequest({
        fromUserId,toUserId,status,
    });
    const data=await connection.save();

    res.json({
        message:"your connection is estalished",
        data
    });




   }catch(error){
    res.status(400).json({message:"something went wrong :"+ error.message});
   }
})

module.exports=requestRouter;