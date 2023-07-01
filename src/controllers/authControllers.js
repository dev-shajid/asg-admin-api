const sendEmail = require('../lib/mail');
const { validateLoginUser, validateRegisterUser, validateRegisterUserByAdmin } = require('../lib/validate');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const { signJwtToken } = require('../lib/jwt')


module.exports = {
    registerByAdmin: async function (req, res) {
        try {
            let { name, email, password } = req.body
            let errors = await validateRegisterUserByAdmin(req.body)
            if (Object.keys(errors).length) return res.status(400).json(errors)
            
            let user = await User.findOne({ email })
            if (user?.name) return res.status(400).json("Email is already registered")

            let hashedPassword = await bcrypt.hash(password, 10)
            user = await User.create({ name, email, password: hashedPassword, role: 'editor' })

            // let mailResponse = await sendEmail({ email, OTP })

            if (user) return res.status(200).json("User is registered successfully!");
            return res.status(400).json("Failed to create User!");
        } catch (error) {
            console.log({ error: error })
            return res.status(500).json({ error: error.message });
        }
    },

    loginAdmin: async function (req, res) {
        try {
            let errors = await validateLoginUser(req.body)
            if (Object.keys(errors).length) return res.status(400).json(errors)

            let user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(400).json("Email is not registered")

            let comparePassword = await bcrypt.compare(req.body.password, user.password)

            if (!comparePassword) return res.status(400).json("Wrong Password")
            if (user.role!='admin' && user.role!='editor') return res.status(400).json("Wrong access!")

            let { password, ...info } = await user._doc
            // console.log(info)
            let token = await signJwtToken(info, { expiresIn: '6d' })
            return res.status(200).json({ message: "Login Successful", token });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    verifyUser: async function (req, res) {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(400).json("Email is not registered")
            else if (user && user.verified) {
                await User.findOneAndUpdate({ email: req.body.email }, { OTP: null })
                return res.status(400).json("Email is already verified")
            }

            if (user.OTP != req.body.OTP) return res.status(400).json("OTP does not match")

            await User.findOneAndUpdate({ email: req.body.email }, { OTP: null, verified: true })
            let { password, ...info } = user
            let token = await signJwtToken(info, { expiresIn: '6d' })
            return res.status(200).json({ message: "Successfully Verified Email", token })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    sendOtpAgain: async function (req, res) {
        try {
            let { email } = req.body

            let user = await User.findOne({ email })
            if (!user) return res.status(400).json("Email is not registered")
            else if (user && user.verified) {
                await User.findOneAndUpdate({ email }, { OTP: null })
                return res.status(400).json("Email is already verified")
            }

            //TODO: Send OTP Here
            let OTP = Math.floor(100000 + Math.random() * 900000)
            let mailResponse = await sendEmail({ email, OTP })

            if (mailResponse.message) return res.status(200).json("Verify Email using OTP sent to your email!");
            return res.status(400).json(mailResponse);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
}