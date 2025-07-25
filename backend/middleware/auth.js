import jwt from 'jsonwebtoken'
import user from '../model/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
export default async function authMiddleware(req,res,next){
    //GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
 
    const authHeader  = req.headers.authorization;
    if(!authHeader ||!authHeader.startWith('Bearer ')){
        return res.status(401).json({success:false,message:"Not Authorized,token missing"});
    }
    const token = authHeader.split(' ')[1];

    //VERIFY & ATTACH THE OBJECT

    try{
        const payLoad = jwt.verify(token,JWT_SECRET);
        const user = await findById(payLoad.id).select('-password');

        if(!user){
            return res.status(401).json({success:false,message:"user not found"});

        }
        req.user = user;
        next();
    }
    catch(err){
        console.log("JWT verification failed",err);
        return res.status(401).json({success:false,message:"Token Invalid"});
    }

}