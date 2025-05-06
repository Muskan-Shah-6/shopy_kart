import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from 'bcryptjs'

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
    const newUser = new User({ username, email, password:hashPassword })

    try {
        await newUser.save()
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

export { createUser };