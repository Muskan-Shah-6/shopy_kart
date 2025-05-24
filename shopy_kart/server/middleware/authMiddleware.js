// Checking if the user is valid or not or for checking if the user is authorised or not.

import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Read the jwt token from jwt cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("Decoded Token:", decoded)
            req.user = await User.findById(decoded.userID).select('-password')
            // console.log("Authenticated User:", req.user)
            next();
        }
        catch (err) {
            res.status(401)
            throw new Error("User not authorized, token failed.")
        }
    } else {
        res.status(401)
        throw new Error("Unauthorized user, token not found.")
    }
})

// Check for the admin if the user is admin

const authorizeAdmin = (req, res, next) => {
    // console.log("Checking Admin Status:", req.user)
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Not authorizedd as an admin")
    }
}

export { authenticate, authorizeAdmin }
