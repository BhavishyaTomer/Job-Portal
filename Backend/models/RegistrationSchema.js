const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  file: {
    type: Object, 
  },
  token:{
    type:String,
    default:null
  }
}, { timestamps: true },);

module.exports = mongoose.model('Registration', registrationSchema);
