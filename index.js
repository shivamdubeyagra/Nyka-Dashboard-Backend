const express = require("express");
const Connection = require("./dbConnect.js")
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes.js");
const productRouter = require("./routes/productRoutes.js");
app.use(cors());
app.use(express.json());
app.use("/api",userRouter,productRouter);


app.listen(8080,async()=>{
    try{
       await Connection;
       console.log(`database is runngin in mongodb`)
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port 8080`);
})