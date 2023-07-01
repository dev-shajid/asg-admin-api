const User = require('../models/userModel');


module.exports = {
     // Get all user
    getUsers: async function (req, res) {
        try {
            const users = await User.find().select('_id name email role verified')

            return res.status(200).json(users)
        } catch (err) {
            return res.status(400).json({ errors: err.message })
        }
    },

    // Get a user by his id
    getUser: async function (req, res) {
        try {
            return res.status(200).json({ message: "User" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Update a user by his id
    updateRole: async function (req, res) {
        try {
            await User.findByIdAndUpdate(req.params.id, {role: 'editor'})

            return res.status(200).json('Successflly Updated')
        } catch (err) {
            return res.status(400).json({ errors: err.message })
        }
    },

    // Delete a user by his id
    deleteUser: async function (req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)

            returnres.status(200).json(req.params.id)
        } catch (err) {
            return res.status(400).json({ errors: err.message })
        }
    },

}