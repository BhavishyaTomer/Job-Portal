const express=require('express');
const { registerCompany, getCompanyById,getCompany} = require('../Controller/companyRegisterController');
const isAuthenticated = require('../middleware/isAuthenticated');
const companyRouter = express.Router();

companyRouter.post("/createCompany",isAuthenticated,registerCompany)
companyRouter.get("/getCompany/:id",isAuthenticated,getCompanyById)
companyRouter.get("/getCompany",isAuthenticated,getCompany)

module.exports=companyRouter