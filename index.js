const express = require("express");
const Connection = require("./dbConnect.js")
const app = express();
const userRouter = require("./routes/userRoutes.js")
app.use(express.json());
app.use("/api",userRouter)


app.listen(8080,async()=>{
    try{
       await Connection;
       console.log(`database is runngin in mongodb`)
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port 8080`);
})