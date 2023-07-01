const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser, sendOtpAgain, registerByAdmin, loginAdmin } = require('../controllers/authControllers');
const { authAdmin, authUser, getAuthUser } = require('../middlewares/authMiddleware');


router.post('/registerByAdmin', authAdmin, registerByAdmin); // Admin middleware
// router.post('/register', registerUser);
// router.post('/login', loginUser);
router.post('/loginAdmin', loginAdmin);
router.post('/verify', verifyUser);
router.post('/sendOtpAgain', sendOtpAgain);

router.get('/getAuth', getAuthUser );


module.exports = router;

/*
TODO: Register:
    fullName,
    userName,
    email, (verify)
    phone,
    password,
    confirm password,
    class --> Dropdown,
    group --> dropdown (Science/Commerce/Arts), Default:Science
    college,
    profile

TODO: Login:
    email,
    password,

TODO: Update:
    fullname,
    profile,
    password,
    class,
    group
    college
*/