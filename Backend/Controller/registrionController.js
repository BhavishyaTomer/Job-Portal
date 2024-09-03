const registration=require('../models/RegistrationSchema.js')
var bcrypt = require('bcryptjs');
const cloudinary=require('../middleware/cloudinary.js')
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const getDataUri = require('../middleware/dataUri.js');
dotenv.config()
const registerUser = async (req, res) => {
    let { email, firstName, lastName, password, role } = req.body;
    let file = req.file 
    //  const fileUri=getDataUri(file);
    //  const cloudRespone =await  cloudinary.uploader.upload(fileUri.content)
    //  console.log("cloud",cloudRespone)
    console.log(email, firstName, lastName, password, file, role, req.file);
  
    if (!email || !firstName || !lastName || !password || !role || !file) {
      return res.status(400).json({
        message:"All Fields are mandatory"});
    }
  
    try {
      const existingUser = await registration.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
            message:"User already present"});
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      const user = await registration.create({ 
        email, 
        firstName, 
        lastName, 
        password: hash, 
        file, 
        role 
      });
  
      const jwtToken = jwt.sign(
        { id: user._id },
        process.env.JWTkey,
        { expiresIn: "2h" }
      );
  
      user.token = jwtToken;
      user.password = undefined;
  
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'Lax'
      };
  
      res.status(200).cookie("token", jwtToken, options).json({
        success: true,
        token: jwtToken,
        user: user,
        message:"successfully logged in"
      });
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await registration.findOne({ email });
        if (!userExist) {
            return res.status(401).json({message:"User Dosent exist"});
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (isPasswordValid) {

            const jwtToken = jwt.sign(
                { id: userExist._id },
                process.env.JWTkey,
                {
                    expiresIn: '2h'
                }
            );

            userExist.token = jwtToken;
            userExist.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'Lax' 
              };
              

            res.status(200).cookie("token", jwtToken, options).json({
                success: true,
                token: jwtToken,
                user: userExist,
                message:"successfully logged in"
            });
        } else {
            res.status(401).json({message:"Invalid Credentials"});
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports={registerUser,loginUser}