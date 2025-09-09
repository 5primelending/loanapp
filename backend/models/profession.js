const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:['Active','Inactive','Suspend'],
        default:"Active"
    }
},{
    timestamps:true
})

const ProfessionModel = mongoose.model('profession',professionSchema)

module.exports = ProfessionModel

