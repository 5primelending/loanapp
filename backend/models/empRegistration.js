const  mongoose = require("mongoose");

const empRegistrationSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    email:{
       type:String,
        default:""
    },
    mobile:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:""
    },
    role:{
       type:String,
       enum:["User","Admin"],
       default:"User"
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
     }
},{
    timestamps:true
})

const empRegistrationModel = mongoose.model('empregistration',empRegistrationSchema)

module.exports = empRegistrationModel
