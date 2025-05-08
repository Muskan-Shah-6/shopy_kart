import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res) => {
    // res.send("Assalamualakum..!")
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        throw new Error("Please fill all the details.")
    }

    const userExists = await User.findOne({ email })
    if (userExists) res.status(400).send("User already exists")

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    // Create new users.
    const newUser = new User({ username, email, password: hashPassword })

    try {
        await newUser.save()
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });

    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// LOgin user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            createToken(res, existingUser._id)

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;
        }
    }
})
export { createUser, loginUser };