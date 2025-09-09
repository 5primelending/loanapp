const  mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
    first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  mobile_no: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  loan_type: {
    type: String,
    required: true
  },
  loan_purpose: {
    type: String
  },
  refer_to_ambak: {
    type: Boolean,
    default: false
  },
  property_state: {
    type: String,
    required: true
  },
  property_city: {
    type: String,
    required: true
  },
  required_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'New Leads'
  },
  follow_up_date: {
    type: Date
  },
  assigned_to: {
    type: String
  },
  comments: {
    type: String
  },
  source: {
    type: String
  },
  documents_uploaded: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const leadModal = mongoose.model('addlead',leadSchema)
module.exports = leadModal
