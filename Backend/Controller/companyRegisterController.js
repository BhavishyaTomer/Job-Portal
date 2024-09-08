
const CompanySchema = require('../models/CompanySchema.js');

const registerCompany=async(req,res)=>{
 const{name,Location,website}=req.body;
 const userId=req.id
 console.log("register")
 try {
    const exist=await CompanySchema.findOne({name})
    console.log("entered try block")
    if(exist) 
    {
       return res.status(400).json({
        message:"Company already present",
    success:false})
    }
    else{
        const newCompany=CompanySchema.create({name,userId,Location,website})
        res.status(200).json({
            message:"Company Successfully Created",
            success:true
        })
    }

 } catch (error) {
    console.log(error)
 }
}
 const getCompany =async (req, res)=> {
    try{
    const userId = req.id; 
    const companies = await CompanySchema.find({userId});
    if(!companies) {
    return res.status(404).json({
    message: "Companies not found.",
    success: false
    })
}
else{
    return res.status(200).json(companies)
}
    } catch (error) {
    console.log(error);
    }
    }

  const getCompanyById =async (req, res) => {
    try {
    const companyId= req.params.id;
    const company =await CompanySchema.findById(companyId);
    if(!company){
        return res.status(404).json({
            message: "Companies not found.",
            success: false
            })
    }
    else{
        return res.status(200).json(company)
    }
    
}catch (error) {
    console.log(error);
    }

    
}

module.exports={registerCompany,getCompany,getCompanyById};