import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {

    let token;

    try {

        console.log(
            "AUTH HEADER:",
            req.headers.authorization
        );


        // check token exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // get token
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // get user data
            req.user = await User.findById(decoded.id)
                .select("-password");

            next();

        } else {

            return res.status(401).json({
                message: "No token provided"
            });
        }

    } catch (error) {

        console.log(
        "AUTH ERROR:",
        error.message
    );

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default protect;