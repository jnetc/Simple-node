const express = require('express');
const Courses = require('../models/courses');
const { Types } = require('mongoose');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Courses.find();

  res.render('courses', {
    title: 'Courses',
    isCourse: true,
    courses,
  });
});

// Get course by id
router.get('/:id', async (req, res) => {
  // Find course by ID from database
  const course = await Courses.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: course.title,
    course,
  });
});

// Edit course
router.get('/edit/:id', async (req, res) => {
  if (!req.query.watch) {
    res.redirect('/');
    return;
  }
  const course = await Courses.findById(req.params.id);
  res.render('edit', {
    title: `Edit ${course.title}`,
    course,
  });
});

router.post('/edit/:id', async (req, res) => {
  const { title, price, image } = req.body;
  const { id } = req.params;
  await Courses.findByIdAndUpdate(id, { title, price, image });
  res.redirect('/courses');
});

// Delete course
router.post('/remove', async (req, res) => {
  try {
    // await Courses.findByIdAndRemove(req.body.id)
    await Courses.deleteOne({
      _id: Types.ObjectId(req.body.id),
    });
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
