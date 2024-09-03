const express=require('express');
const { registerCompany, getCompanyById,getCompany} = require('../Controller/companyRegisterController');
const companyRouter = express.Router();

companyRouter.post("/createCompany",registerCompany)
companyRouter.get("/getCompany/:id",getCompanyById)
companyRouter.get("/getCompany",getCompany)

module.exports=companyRouter