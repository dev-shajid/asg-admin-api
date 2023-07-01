const express = require('express');
const router = express.Router();
const { getUsers, getUser, deleteUser, updateRole } = require('../controllers/userControllers');
const { authUser, authAdmin } = require('../middlewares/authMiddleware');


router.get('/getUsers', getUsers);
// router.get('/getUsers/:id', getUser);
router.post('/updateRole/:id', updateRole ); //TODO:
router.delete('/deleteUser/:id', authAdmin, deleteUser ); //TODO:

module.exports = router;
