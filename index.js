const express     = require('express')
const path        = require('path')
const bodyParser  = require('body-parser')
const exphbs      = require('express-handlebars');

  // Import routers
const routerHome     = require('./router/home')
const routerCourses  = require('./router/courses')
const routerAdd      = require('./router/add')
const routerCard     = require('./router/card')

const app = express()

  // Parser
app.use(bodyParser.urlencoded({extended: true}))
  // Public folder
app.use(express.static(path.join(__dirname + '/public')))

// Handlebars engine
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', 'view')

  // Routers
app.use(routerHome)
app.use('/courses', routerCourses)
app.use('/add', routerAdd)
app.use('/card', routerCard)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is running...'))