const express = require('express')
const Courses = require('../models/courses')

const router  = express.Router()

router.get('/', (req, res) => {
    res.render('add', {
      title: 'Add new course',
      isAdd: true
    })
})

router.post('/', async (req, res) => {
  const { title, price, image } = req.body
  await Courses.add({ title, price, image })
  res.redirect('/courses')
})

module.exports = router