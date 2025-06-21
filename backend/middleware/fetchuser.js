const jwt = require('jsonwebtoken');

const JWT_SECRET = "iNotebook-auth";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({success:false,error:"Invalid Token"});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).json({success:false,error:"Invalid Token"});
    }
};

module.exports = fetchuser;