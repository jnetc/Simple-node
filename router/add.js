const express = require('express');
const Courses = require('../models/courses');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add new course',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  // console.log(req.user);

  const { title, price, image } = req.body;
  const { _id } = req.user;
  // Create new mohngo model
  const course = new Courses({ title, price, image, userId: _id });

  try {
    // Save to mongodb / save() - mongodb method
    await course.save();
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
