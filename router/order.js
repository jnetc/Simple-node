const { Router } = require('express');
const Order = require('../models/order');
const router = Router();

router.get('/', async (req, res) => {
  // Get order & check current user id
  const getOrder = await Order.find({ 'user.userId': req.user._id }).populate(
    'user.userId'
  );

  // Create data to render view
  const orders = getOrder.map(order => {
    return {
      ...order._doc,
      total: order.courses.reduce((prev, curr) => {
        return prev + curr.count * curr.course.price;
      }, 0),
    };
  });

  res.render('order', {
    title: 'My orders',
    isOrder: true,
    orders,
  });
});

router.post('/', async (req, res) => {
  try {
    // Get user data with populate
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    // refactor object
    const courses = user.cart.items.map(c => ({
      count: c.count,
      course: { ...c.courseId._doc },
    }));

    // Create new order
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      courses,
    });
    // Save to order
    await order.save();
    // Claer cart
    await req.user.updateOne({ cart: { items: [] } });
    // redirect to order
    res.redirect('/order');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
