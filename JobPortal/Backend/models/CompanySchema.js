const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Registration',
        required:true
    }
}, { timestamps: true })
module.exports=mongoose.model("companySchema",companySchema)