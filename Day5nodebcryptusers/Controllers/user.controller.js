import User from "../Models/user.schema.js"
import bcrypt from 'bcrypt'

export const registerUser= async(req,res)=>{
    try {
        const {username, password, email}= req.body
        const hashPassword= await bcrypt.hash(password, 10)
        console.log("hashPassword",hashPassword);

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

        res.status(200).json({ message: "Login successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed , internal error" })
    }

}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        console.log();
        const { username, email, password } = req.body

        const user = await User.findOne({ _id:id })
        if (!user) {
            return res.status(401).json({ message: "user not found" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const result = await User.updateOne({ _id: id }, { username, email, password: hashPassword })

        if (result.matchedCount === 0) {
            return res.status(401).json({ message: "user not matched" })
        }
        const updatedUser = await User.findById(id)

        res.status(200).json({ message: "updated successfully", data: updatedUser })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Update failed , internal error" })
    }
}

export const deleteUser=async(req,res)=>{
    try {
        const userId  = req.params.id

        const deletedUser= await User.deleteOne({_id:userId})
        if(deletedUser.deletedCount === 0){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: "Delete failed , internal error" })        
    }
}