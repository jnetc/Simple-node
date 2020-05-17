const express = require('express');
const Courses = require('../models/courses');
const { Types } = require('mongoose');

const router = express.Router();

// ADD TO CART
router.post('/add', async (req, res) => {
  // Get ID course
  const { id } = req.body;
  // Get array of cart from user (auth index.js)
  const { items } = req.user.cart;
  // Find current course from mongodb
  const course = await Courses.findOne(Types.ObjectId(id));
  // Find course from cart
  const item = items.find(i => {
    return i.courseId.toString() === course._id.toString();
  });
  // Check course
  if (item) {
    item.count++;
  } else {
    items.push({
      count: 1,
      courseId: course._id,
    });
  }
  // Update user cart in mongodb
  await req.user.updateOne({ cart: { items } });
  // Route to cart
  res.redirect('/cart');
});

// SHOW ALL COURSES
router.get('/', async (req, res) => {

    // Check user
  if (!req.user) {
    res.redirect('/');
    return;
  }
  // Get all data from cart courses id
  const courses = await req.user.populate('cart.items.courseId').execPopulate();
  // Array (remove random _id with key _id:false in "user model")
  const items = courses.cart.items;
  // Compute sum all of courses
  const total = items.reduce((prev, curr) => {
    return prev + curr.courseId.price * curr.count;
  }, 0);

  res.render('cart', {
    title: 'Basket',
    isCart: true,
    items,
    total,
  });
});

router.post('/', (req, res) => {
  res.render('cart', {
    title: 'Basket',
  });
});

// REMOVE FROM CART
router.post('/remove', async (req, res) => {
    // Get cart array & course id
  const { items } = req.user.cart
  const { id } = req.body
    // Find current course by id
  const idx = items.findIndex(c => c.courseId.toString() === id)
    // Check count
  if (items[idx].count > 1) {
    items[idx].count--
  } else {
    items.splice(idx, 1)
  }
    // Update usr cart
  await req.user.updateOne({cart: {items}})
  // Route to cart
  res.redirect('/cart');
});

module.exports = router;
