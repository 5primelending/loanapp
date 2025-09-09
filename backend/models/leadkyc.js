const mongoose = require('mongoose');
const kycSchema = new mongoose.Schema({
    leadid:{
      type:mongoose.Schema.ObjectId,
      ref:"addlead"
    },
    kycOption:{
        type:String,
        default:""
    }

},{
   timestamps:true
})

const kycModel = mongoose.model('leadkyc',kycSchema)
module.exports = kycModel