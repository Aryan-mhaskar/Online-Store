import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

// Check email
        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

// Hash password
                const hash = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(username,email,password) VALUES(?,?,?)",
                    [username, email, hash],
                    (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        }

                        return res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = (req, res) => {
    const { email, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },

                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }

            );

            res.status(200).json({
                message: "Login Successful",
                token
            });
        }
    );

};