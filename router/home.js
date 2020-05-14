const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
  res.render('index', {
    body: 'Hello fron handlebars',
    title: 'Main page',
    isHome: true
  })
})


module.exports = router