import express from 'express'
import { registerUser, loginUser, updateUser, deleteUser } from '../Controllers/user.controller.js';

const router= express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



export default router;