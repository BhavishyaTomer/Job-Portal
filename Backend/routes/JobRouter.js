const express=require('express');
const { createJob,getAllJobs,getJobById} = require('../Controller/jobController.js');
const isAuthenticated = require('../middleware/isAuthenticated.js');
const jobRouter = express.Router();

jobRouter.post("/createJob",isAuthenticated,createJob)
jobRouter.get("/getAllJobs/:id",getJobById)
jobRouter.get("/getAllJobs", getAllJobs);  

module.exports=jobRouter