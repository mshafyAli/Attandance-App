import express from 'express';
import { signup,signin, google,signout,forgotpassword } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google);
router.get('/signout',signout)
router.post('/forgotpassword',forgotpassword);

export default router