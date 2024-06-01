//  package requiring 
const express= require('express')
const app =express()
const mongoose =require('mongoose')
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors =require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

// MONGODB connection 
mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB connection successfully");
})
.catch(()=>{
    console.log("DB is not connected");
})





// middleware
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cookieParser());
const router = require ('./Router/Auth')
app.use('/api',router)

// router 





// port server 
app.listen(process.env.PORT,()=>{
    console.log("SERVER PORT:",process.env.PORT);
})