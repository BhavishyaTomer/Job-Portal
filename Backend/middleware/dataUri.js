const dataUri=require('datauri/parser')
const path =require('path')
const getDataUri=(file)=>{
    const parcer=new dataUri()
    const extName=path.extname(file.originalname).toString();
    return parcer.format(extName,file.buffer)
}

module.exports=getDataUri