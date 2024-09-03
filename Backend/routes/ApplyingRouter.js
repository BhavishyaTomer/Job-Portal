const {updateStatus,getApplicants,getAppliedJobs,applyToApplication}=require('../Controller/applicationController')
const express=require('express');
const applicationRouter=express.Router()

applicationRouter.get("/ApplyToJob/:id",applyToApplication)
applicationRouter.get("/getAppliedJob",getAppliedJobs)
applicationRouter.get("/getAppliedJob/:id",getApplicants)
applicationRouter.post("/updateStatus/:id",updateStatus)


module.exports=applicationRouter