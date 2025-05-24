import express from 'express';
import { createUser, loginUser, logoutCurrentUser, getAllusers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllusers)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

// ADMIN ROUTES STARTS HERE
// get the specific user from the admin side, update the specific user from the admin side as well as can delete the user from an admin side.
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById)

export default router