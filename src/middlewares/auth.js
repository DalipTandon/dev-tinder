const adminAuthentication=(req,res,next)=>{
    const token="xyz";
    const authorizedToken=token==="xyz";
    if(!authorizedToken){
        res.status(401).send("Not authorized");
    }else{
       next();
    }
}
const userAuthentication=(req,res,next)=>{
    const token="xyz";
    const authorizedToken=token==="xyz";
    if(!authorizedToken){
        res.status(401).send("Not authorized");
    }else{
       next();
    }
}


module.exports={
adminAuthentication,userAuthentication,
}