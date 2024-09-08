const {updateStatus,getApplicants,getAppliedJobs,applyToApplication,getPostedJobs}=require('../Controller/applicationController')
const express=require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const applicationRouter=express.Router()

applicationRouter.get("/ApplyToJob/:id",isAuthenticated,applyToApplication)
applicationRouter.get("/getAppliedJob",isAuthenticated,getAppliedJobs)
applicationRouter.get("/getAppliedJob/:id",isAuthenticated,getApplicants)
applicationRouter.post("/updateStatus/:id",isAuthenticated,updateStatus)
applicationRouter.get("/getPostedJob",isAuthenticated,getPostedJobs)



module.exports=applicationRouter