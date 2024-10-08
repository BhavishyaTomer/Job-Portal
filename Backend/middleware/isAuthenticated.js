const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("token",token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated or not logged in",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.JWTkey);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.id = decode.id;
        // console.log("req.id",req.id)
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
        
    }
};

module.exports = isAuthenticated;
