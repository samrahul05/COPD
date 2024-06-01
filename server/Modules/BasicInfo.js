
const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User_data',
          },
      name:String,
      age:String,
      height:String,
      weight:String,
      gender:String,
      smokingStatus:String,
      

    })

module.exports=mongoose.model('BasicInfo',user)