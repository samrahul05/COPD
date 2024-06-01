
const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User_data',
          },
          token:String,
      

    })

module.exports=mongoose.model('User_Token',user)