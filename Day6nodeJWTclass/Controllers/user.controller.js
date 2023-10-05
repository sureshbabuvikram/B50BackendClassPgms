import User from "../Models/user.schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mail from "../Services/nodemail.js"
dotenv.config()

export const registerUser= async(req,res)=>{
    try {
        const {username, password, email}= req.body
        const hashPassword= await bcrypt.hash(password, 10)
        // console.log("hashPassword",hashPassword);

        const newUser= new User({username, email, password:hashPassword})
        await newUser.save()
        res.status(200).json({message:"user registered succefully", data:newUser})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Register failed , internal error"})
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "user not found" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid user password" })
        }

        const token= jwt.sign({_id:user._id},process.env.JWT_SECERT)

        mail();
        res.status(200).json({ message: "Login successfully", token:token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed , internal error" })
    }

}

export const getUserById=async(req,res)=>{
    try {
        const userId= req.user._id
        const user= await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(err);
        res.status(500).json({err:" Error in get user by id"})
    }

}