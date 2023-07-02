const Course = require('../models/courseModel');


module.exports = {
    getCoursesClient: async function (req, res) {
        try {
            if (req.query.id) {
                const course = await Course.findById({ _id: req.query.id, })
                if (course) {
                    return res.status(200).json(course)
                } else {
                    return res.status(400).json({ error: "Didn't get any course" })
                }
            } else {
                const { subject, chapter } = req.query
                if (req.query.class && subject && chapter) {
                    const courses = await Course.find({ class: req.query.class.toUpperCase(), subValue: subject, chapter })
                    return res.status(200).json(courses)
                }
                return res.status(400).json({ error: "Failed to find Course" })
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
    getCourses: async function (req, res) {
        try {
            if (req.query.id) {
                const course = await Course.findById(req.query.id)
                if (course) {
                    return res.status(200).json(course)
                } else {
                    return res.status(400).json({ error: "Didn't get any course" })
                }
            }
            let query = {}

            const { limit = 10, page, class: classValue, subject } = req.query
            if (classValue) query.class = classValue.toUpperCase()
            if (subject) query.subValue = subject
            let skip = (page - 1) * limit
            // console.log({classValue,subject})

            const courses = await Course.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip)

            // console.log({courses})
            res.status(200).json(courses)

        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
    getTotalCourseNumber: async function (req, res) {
        try {
            let query = {}
            if (req.query.subject) query.subValue = req.query.subject
            let total = await Course.count(query)

            res.status(200).json(total)

        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
    createCourse: async function (req, res) {
        try {
            const { playlistID: playlistId, image, name, total, subject, subValue, chapter, title, category } = req.body
            // console.log(req.user)
            let course
            if (req.user.role == 'admin' || req.user.role == 'editor') {
                course = await Course.create({ playlistId, image, name, total, subject, subValue, chapter, title, category, class: req.body.class })
            } else {
                course = true
            }

            if (course) {
                console.log(course)
                res.status(200).json("Successfully Created Course")
            } else {
                res.status(400).json("Failed to create Course")
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
    updateCourse: async function (req, res) {
        try {
            const { _id, playlistId, image, name, total, subject, subValue, chapter, title, category } = req.body

            let course
            if (req.user.role == 'admin' || req.user.role == 'editor') {
                course = await Course.findByIdAndUpdate(_id, { playlistId, name, image, total, subject, subValue, chapter, title, category, class: req.body.class })
            } else {
                course = true
            }

            if (course) {
                res.status(200).json('Successfully Updated Course')
            } else {
                res.status(400).json({ error: "Failed to update Course" })
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
    deleteCourse: async function (req, res) {
        try {
            const { id } = req.params

            if (req.user.role == 'admin' || req.user.role == 'editor') {
                await Course.findByIdAndDelete(id)
            }

            res.status(200).json("Deleted Course")
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    },
}