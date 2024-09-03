const express=require('express');
const { createJob,getAllJobs,getJobById} = require('../Controller/jobController.js');
const jobRouter = express.Router();

jobRouter.post("/createJob",createJob)
jobRouter.get("/getAllJobs/:id",getJobById)
jobRouter.get("/getAllJobs", getAllJobs);  

module.exports=jobRouter