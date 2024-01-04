const express = require("express");
const bcrypt = require("bcrypt")
const UserModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const userRouter = express.Router();

userRouter.post('/register',async(req,res)=>{
    const {name,avatar,email,password} = req.body;
    try{
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
          return res.status(201).send({ msg: "Please Login, user already exist" });
        } else {
          const passwordRegex = 
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*!]){8}/;
          const passwordCheck = passwordRegex.test(password);
          if (!passwordCheck) {
            return res
              .status(201)
              .send({
                msg: "Password should have at least 1 UpperCase, 1 Lowercase, 1 Number, 1 Special Character",
              });
          }
          bcrypt.hash(password, 6, async (err, hash) => {
            if (err) {
              return res
                .status(400)
                .send({ msg: "Something Went wrong in password" });
            } else {
              const newUser = new UserModel({
                name,
                avatar,
                email,
                password: hash,
              });
              await newUser.save();
              return res
                .status(201)
                .send({ msg: "A new user has been registered" });
            }
          });
        }
    }catch(err){
        return res
        .status(400)
        .send({ msg: "Something went wront in the register catch block" });
    }
})
userRouter.post("/login", async (req, res) => {
    const {email, password } = req.body;
    try {
      const userNotExist = await UserModel.findOne({ email });
      if (!userNotExist) {
        return res.status(201).send({ msg: "Please Signup First." });
      } else {
        bcrypt.compare(password, userNotExist.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { userId: userNotExist._id },
              "masaifw27",
              { expiresIn: "7d" }
            );
            res.status(200).send({ msg: "Login Successfull", token: token });
          } else {
            res.status(200).send({ msg: "Invalid Credentials" });
          }
        });
      }
    } catch (error) {
      return res
        .status(400)
        .send({ msg: "Something went wront in the login catch block" });
    }
});
module.exports = userRouter