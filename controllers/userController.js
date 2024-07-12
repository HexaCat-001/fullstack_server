const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken')
var { expressjwt: jwt } = require("express-jwt");
require('dotenv').config();

// * middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET , 
    algorithms: ["HS256"]
})

// ! Register
const registerController = async (req, res) => {
    try {
        const { name, email, phone, dob, password } = req.body;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'name is required!'
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'email is required!'
            })
        } if (!phone) {
            return res.status(400).send({
                success: false,
                message: 'phone is required!'
            })
        } // if (!dob) {
        //     return res.status(400).send({
        //         success: false,
        //         message: 'dob is required!'
        //     }) }
        if (!password || password.length < 3) {
            return res.status(400).send({
                success: false,
                message: 'password is required & must be longer than 2 character!'
            })
        }

        // * existing user
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'User already exists with this email'
            })
        }

        // * hashed password
        const hashedPassword = await hashPassword(password)

        // * save user
        const user = await userModel({ name, email, phone, dob, password: hashedPassword }).save()

        return res.status(200).send({
            success: true,
            message: 'Registration Successful, please login..'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Registration Unsuccessful, please login..',
            error: error
        });
    }
};

// ! Login
const loginController = async (req, res) => {
    try {
        // Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email or password',
            })
        }
        // find User
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User doesn't exist"
            });
        }
        // match password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Token jwt
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '397d',
        })

        // undefine/hide password
        user.password = undefined

        // if everything is ok then..
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Login Failed, please register again..',
            error
        });
    }
};

// ! Update
const updateUserController = async (req, res) => {
    try {
        const { name, password, dob, phone, email } = req.body;
        // user find
        const user = await userModel.findOne({ email })
        // password validate
        if (password && password.length < 4) {
            return res.status(400).send({
                success: false,
                message: 'Password is required & 6 characters long',
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        // update user
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            name: name || user.name,
            password: hashedPassword || user.password,
            dob: dob || user.dob,
            phone: phone || user.phone
        }, { new: true })
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'User details updated successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in User update API',
            error
        })
    }
};
 


module.exports = { registerController, loginController, updateUserController, requireSignIn };