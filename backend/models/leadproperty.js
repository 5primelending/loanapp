const mongoose = require('mongoose');

const leadpropertySchema = new mongoose.Schema({
    leadid:{
      type:mongoose.Schema.ObjectId,
      ref:"addlead"
    },
    propertyIdentified:{
        type:String,
        default:""
    },
    propertylocation:{
        type:String,
        default:""
    },
    propertyBuilderName:{
        type:String,
        default:""
    },
    propertyTower:{
        type:String,
        default:""
    },
    propertyunitType:{
        type:String,
        default:""
    },
    propertyValue:{
        type:String,
        default:""
    },
    propertyType:{
        type:String,
        default:""
    },
    usageType:{
        type:String,
        default:""
    },
    agreementtype:{
        type:String,
        default:""
    }

},{
    timestamps:true
})

const leadpropertyModel = mongoose.model('leadproperty',leadpropertySchema)
module.exports=leadpropertyModel