import express from 'express';
import { createUser, loginUser, logoutCurrentUser, getAllusers } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllusers)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)


export default router