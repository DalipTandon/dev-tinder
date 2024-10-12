const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        min:2,
        max:50,
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Imvalid email id"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong password"+value);
            }
        }
    },
    age:{
        type:Number,
        mmin:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    profilUrl:{
        type:String,
        default:"data:image/png;",
        
    },
   skills: {
        type:[String],
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);