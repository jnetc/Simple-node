const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// Import routers
const routerHome    = require('./router/home');
const routerCourses = require('./router/courses');
const routerAdd     = require('./router/add');
const routerCart    = require('./router/cart');
const routerOrder   = require('./router/order');

// Import MOdel
const User = require('./models/user');

const app = express();

// User middleware
app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5ec14daedf1ddf13f418f0e2');
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

// Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Public folder
app.use(express.static(path.join(__dirname + '/public')));

// Handlebars engine
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'view');

// Routers
app.use(routerHome);
app.use('/courses', routerCourses);
app.use('/add', routerAdd);
app.use('/cart', routerCart);
app.use('/order', routerOrder);

async function start() {
  const PORT = process.env.PORT || 3000;
  const url = `mongodb+srv://admin:admin@nodejs-eg0pt.mongodb.net/store`;

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const condidate = await User.findOne();
    if (!condidate) {
      const user = new User({
        email: 'admin@admin.com',
        name: 'Admin',
        cart: { items: [] },
      });
      await user.save();
    } else {
    }
    app.listen(PORT, () => console.log('Server is running...'));
  } catch (error) {
    console.log(error);
  }
}

start();
