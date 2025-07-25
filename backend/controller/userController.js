import User from '../model/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRES = '24h';

const createToken =(userId) =>jwt.sign({id:userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRES});
//REGISTER FUNCTION

export async function registerUser(req,res){
    const{name,email,password} = req.body;

    if(!name ||!email ||!password){
        return res.status(400).json({success:false,message: "All fields are required"});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({success:false,message:"Invalid email"});
    }
    if(password.length<8){
        return res.status(400).json({success:false,message:"Password must be atleast 8 characters"})
    }
    try{
        if(await User.findOne({email})){
            return res.status(409).json({success:false,message:"User already exists"});
        }
        const hashed = await bcrypt.hash(password,10);
        const newUser = await User.create({name,email,password:hashed});
        const token = createToken(newUser._id);

        res.status(201).json({success:true,token,user:{id:newUser._id,name:newUser.name,email:newUser.email}});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});
    }
}
    
//Login Function

export async function loginUser(req,res){
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({success:false,message:"Email and Password required"})
    }
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({success:false,message:"Invalid Credentials"});
        }
        const match = await bcrypt.compare(password,existingUser.password);
        if(!match){
            return res.status(401).json({success:false,message:"Invalid Credentials"});
        }
        const token = createToken(existingUser._id);
        res.json({success:true,token,user:{id:existingUser._id,name:existingUser.name,email:existingUser.email}});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});
    }
}


// GET CURRENT USER
 export async function getCurrentUser(req,res){
    try{
        const user = await User.findById(req.user.id).select("name email");
        if(!user){
            return res.status(400).json({success:false,message:"User not Found"});
        }
        res.json({success:true,user})
    }
    catch(err){
        console.log(err);
         res.status(500).json({success:false,message:"server error"});
    }
 }

 //update USER profile

 export async function updateProfile(req,res){
    const{name,email}= req.body;
    if(!name || !email|| !validator.isEmail(email)){
        return res.status(400).json({success:false,message:"valid name and email required"});
    }
    try{
        const exists = await  User.findOne({email,_id:{$ne:req.user.id}});
        if(exists){
            return res.status(409).json({success:false,message:"Email already is use by another account"});
        }
        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            {name,email},
            {new:true,runvalidators:true,select:"name email"}
        );
        res.json({success:true,updateUser});
    } 
    catch(error){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});

    }
 }

 //change password function

 export async function updatePassword(req,res) {
    const { currentPassword, newPassword } = req.body;
    if(!currentPassword||!newPassword || newPassword.length<8){
        return res.status(400).json({success:false,message:"password invalid or too short"});
    }
    try{
        const userDoc = await User.findById(req.user.id).select("password");
        if(!userDoc){
            return res.status(404).json({success:false,message:"user not found"});
        }
        const match = await bcrypt.compare(currentPassword,userDoc.password);
        if(!match){
            return res.status(401).json({success:false,message:"current password incorrect"});
        }
        userDoc.password = await bcrypt.hash(newPassword,10);
        await userDoc.save();
        res.json({success:true,message:"password changed"});
    }
    catch(error){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});

    }
    
 }