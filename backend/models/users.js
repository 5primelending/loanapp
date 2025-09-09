const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    organisationtype:{
        type:String,
        enum:['Individual','Organization'],
        default:"Individual"
    },
    partnercode:{
        type:String,
        default:""
    },
    partnerempcode:{
        type:String,
        default:""
    },
    name:{
        type:String,
        required:[true,"Provide Name"]
    },
    email:{
        type:String,
        required:[true,"Provide Email Id"]
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    mobile:{
        type:String,
        required:[true,"Provide Mobile No."],
        unique:true
    },
    panno:{
        type:String,
        required:[true,"Provide PAN No."]
    },
    address:{
        type:String,
        default:""
    },
    pinno:{
        type:Number,
        required:[true,"Provide PIN No."]
    },
    city:{
        type:String,
        default:""
    },
    district:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    profession:{
        type:mongoose.Schema.ObjectId,
        ref:"profession",
        required:[true,"Provide Profession"]
    },
    referralcode:{
        type:String,
        default:""
    },
    gstin:{
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

const UsersModel = mongoose.model('users',usersSchema)
module.exports=UsersModel