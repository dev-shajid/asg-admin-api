const { verifyJwtToken } = require("../lib/jwt")

async function getAuthUser(req, res) {
    try {
        let token = req.headers?.authorization?.split(' ')[1]
        let decoded = await verifyJwtToken(token)
        if (!decoded) return res.status(400).json('Not authenticat User')

        return res.status(200).json(decoded)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function authUser(req, res, next) {
    try {
        let token = req.headers?.authorization?.split(' ')[1]
        let decoded = await verifyJwtToken(token)
        if (!decoded) return res.status(400).json('Not authenticat User')

        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function authEditor(req, res, next) {
    try {
        let token = req.headers?.authorization?.split(' ')[1]
        let decoded = await verifyJwtToken(token)
        if (!decoded) return res.status(400).json('Not authenticat User')
        if (decoded.role && decoded.role == 'user') return res.status(400).json('You are not allowed!')

        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function authAdmin(req, res, next) {
    try {
        let token = req.headers?.authorization?.split(' ')[1]
        let decoded = await verifyJwtToken(token)
        if (!decoded) return res.status(400).json('Not authenticat User')

        if (decoded.role != 'admin') return res.status(400).json('You are not allowed!')

        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = { authAdmin, authUser, authEditor, getAuthUser }