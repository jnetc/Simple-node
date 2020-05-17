const { Schema, model } = require('mongoose');

const course = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  userId: {
    type: Schema.Types.ObjectId,
    // ref - merge with User model
    ref: 'User',
  },
});

module.exports = model('Course', course);
