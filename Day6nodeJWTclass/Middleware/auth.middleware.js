import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware=(req,res,next)=>{
    const token= req.header('Authorization')
    if(!token){
        return res.status(401).json({error:"Token is missing"})
    }
    try {
       const decoded= jwt.verify(token, process.env.JWT_SECERT)
       console.log("decoded",decoded);
       req.user= decoded
    //    console.log(" req.user", req.user);
       next();        
    } catch (error) {
        res.status(401).json({error:"invalid token"})
    }
}

export default authMiddleware;