const mongoose=require('mongoose')
const schema=mongoose.Schema
const JobSchema=new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    location:{
        type:String
    },
    skills:[
        {
            type:String
        }
    ],
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"companySchema",
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Registration',
        required:true
    },
    application:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }]
}, { timestamps: true })

module.exports=mongoose.model("JobSchema",JobSchema)