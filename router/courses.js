const express = require('express')
const Courses = require('../models/courses')

const router = express.Router()

  // Get all courses
router.get('/', async (req, res) => {
    const courses = await Courses.getAll()
    res.render('courses', {
      title: 'Courses',
      isCourse: true,
      courses
    })
})
  // Get course by id
router.get('/:id', async (req, res) => {
    // Check for query option
  const course = await Courses.getByID(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: course.title,
    course
  })
})
  // Edit course
router.get('/edit/:id', async(req, res) => {
  console.log(req.query);
  console.log(req.params);
  
  
  if (!req.query.watch) {
    res.redirect('/')
    return
  }
  const course = await Courses.getByID(req.params.id)
  res.render('edit', {
    title: `Edit ${course.title}`,
    course
  })
})
router.post('/edit/:id', async(req, res) => {
  const {title, price, image} = req.body
  const {id} = req.params
  await Courses.edit(id, {title, price, image})
  res.redirect('/courses')
})



module.exports = router