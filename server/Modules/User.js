// for validation 

const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
      name:String,
      email:String,
      phoneNumber:String,
      password:String,
    })

module.exports=mongoose.model('User_data',user)