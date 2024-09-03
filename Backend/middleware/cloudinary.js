const cloudinary=require('cloudinary')
const dotenv=require('dotenv')
dotenv.config()
cloudinary.config({ 
    cloud_name: 'dy94jla0h', 
    api_key: '862145599261932', 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports=cloudinary