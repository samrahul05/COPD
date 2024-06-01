const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User_data',
          },
      
		  coughFrequency: {
		type: String,
		// enum: ["Never", "Occasionally","Frequently","Constantly"]
	   },
       breathlessness: {
		type: String,
		// enum: ["Not at all", "Mild","Moderate","Severe"]
	   },
       chestTightness: {
		type: String,
		// enum: ["Yep", "Nope","Sometimes","Rare"]
	   },
       difficultySleeping: {
		type: String,
		// enum: ["Yes", "No","Shortly","Rarely"]
	   },

    })

module.exports=mongoose.model('Symptoms',user)