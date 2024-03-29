const jwt = require("jsonwebtoken");
const {BlacklistModel} = require("../models/blacklistModel.js");
const authenticator = async (req,res,next) =>{
  try{
    let token = req?.headers?.authorization.split(" ")[1];
    if(!token){
      return res.status(400).send({"msg":"You are not authorized to acess this resource."})
    }else{
      const isTokenBlacklisted = await BlacklistModel.findOne({token});
      if(isTokenBlacklisted){
        return res.status(400).send({"msg":"Please Login again."})
      }
      jwt.verify(token,"masaifw27",(err,decoded)=>{
        if(decoded){
          req.body.userId= decoded.userId;
          next();
        }else{
          return res.status(404).send("You are not authorized");
        }
      })
    }
  }catch(error){
    return res.status(404).send("You are not authorized in middleware catch block");
  }
}
module.exports = {authenticator};