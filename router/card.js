const express = require('express')
const Courses = require('../models/courses')
const Card = require('../models/card')

const router  = express.Router()

  // ADD TO CARD
router.post('/add', async (req, res) => {
    // Find current corse in file
  const course = await Courses.getByID(req.body.id)
    // Add course to card
  await Card.addToCard(course)
    // Route to card
  res.redirect('/card')
})



  // SHOW ALL CARDS
router.get('/', async (req, res) => {
    // Get all cards to render
  const cards = await Card.getAll()
    // Compute sum all of courses
  const total = cards.reduce((prev, curr) => {
    return prev + curr.total
  }, 0)

  res.render('card', {
    title: 'Basket',
    isCard: true,
    cards,
    total
  })
})

router.post('/', (req, res) => {
  
  res.render('card', {
    title: 'Basket',
  })
})

// REMOVE FROM CARD
router.post('/remove', async (req, res) => {
    // Delete card or count
  Card.delFromCard(req.body.id)
    // Route to card
  res.redirect('/card')
})

module.exports = router