const { Schema, model } = require('mongoose');

const user = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        _id: false,
        count: {
          type: Number,
          require: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          // ref - merge with Course model
          ref: 'Course',
          require: true,
        },
      },
    ],
  },
});

module.exports = model('User', user);
