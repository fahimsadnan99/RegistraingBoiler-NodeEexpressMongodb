const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const responseMsg = require("./helper/errerMsg")
const User = require("./route/userRoute")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())


//All ROUTE
app.use("/api",User)

app.get("/",(req,res)=>{
    responseMsg(res,200)
})


//PORT 
let port =process.env.port || 5001;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});


//DB Connection

let DB = process.env.DATA_BASE
mongoose.set('strictQuery', true);

mongoose.connect(DB)
.then(()=> console.log("Database Connection successful"))
.catch(()=> console.log("Database connection faild"))

