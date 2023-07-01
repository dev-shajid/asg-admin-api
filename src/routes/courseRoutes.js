const express = require('express');
const router = express.Router();
const { createCourse, updateCourse, deleteCourse, getCourses, getTotalCourseNumber } = require('../controllers/courseControllers');
const { authAdmin } = require('../middlewares/authMiddleware');


router.get('/getCourses', getCourses);
router.get('/count', getTotalCourseNumber);
router.post('/createCourse', authAdmin, createCourse);
router.patch('/updateCourse', authAdmin, updateCourse);
router.delete('/deleteCourse/:id', authAdmin, deleteCourse);


module.exports = router;
