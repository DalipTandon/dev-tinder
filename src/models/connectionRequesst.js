const mongoose=require("mongoose");

const connectionSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{value} is incorrect status type`,
        }
    }
},{timestamps:true});


 connectionSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("invalid user connection");
    }
    next();
 })

const ConnectionModel=new mongoose.model("ConnectionModel",connectionSchema);


module.exports=ConnectionModel;