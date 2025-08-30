const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                { message: "Invalid email or password" }
            );
        }
        
        res.status(200).json(
            {
                message: "Signin successful",
                success: true,
                user: user.name
            });
    } catch (error) {
        res.status(500).json(
            {
                message: "Server error",
                error: error.message
            }
        );
    }
};

module.exports = { Signup, Signin };