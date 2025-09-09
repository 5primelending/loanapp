const mongoose = require('mongoose');
const userkycSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    pancardpdf:{
        type:String,
        required:[true,"Provide PAN Card"]
    },
    adharcardpdf:{
        type:String,
        required:[true,"Provide Adhar Card"]
    },
    bankdocumentpdf:{
        type:String,
        required:[true,"Provide Bank Document"]
    },
    gstCertificatepdf:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const UserkycModel = mongoose.model('userkyc',userkycSchema)
module.exports=UserkycModel