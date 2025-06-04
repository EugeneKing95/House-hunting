import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controllers/authController';

// import { registerUser, loginUser, getAllUsers } from '../controllers/userController';
//
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);


export default router;

