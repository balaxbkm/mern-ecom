const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");



// register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const isUserExists = await User.findOne({
            $or: [{ userName }, { email }],
        });
        if (isUserExists) return res.json({ success: false, message: "User already existed!" });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration Success!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error._message
        });
    }
}

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User does not exists, Please register first!" });

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.json({ success: false, message: "Invalid credentials, Please try again!" });

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            userName: user.userName,
            role: user.role
        }, "CLIENT_SECRET_KEY", { expiresIn: "60m" });

        // res.cookie("token", token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "Logged in successfully!",
        //     user: {
        //         id: user._id,
        //         userName: user.userName,
        //         email: user.email,
        //         role: user.role
        //     }
        // });

        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error._message
        });
    }
}

// logout
const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "User logged out successfully!"
    });
}

// auth middleware
// const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({
//         success: false,
//         message: "Unauthorized user!"
//     });

//     try {
//         const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: "Unauthorized user!"
//         });
//     }
// }

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({
        success: false,
        message: "Unauthorized user!"
    });

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };