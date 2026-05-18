const mongoose =
require('mongoose')

/*
|--------------------------------------------------------------------------
| USER SCHEMA
|--------------------------------------------------------------------------
*/

const userSchema =
new mongoose.Schema({

  id: {

    type: Number,

    required: true,

    unique: true

  },

  username: {

    type: String,

    default: ''

  },

  firstName: {

    type: String,

    default: ''

  },

  xp: {

    type: Number,

    default: 0

  },

  money: {

    type: Number,

    default: 0

  },

  banned: {

    type: Boolean,

    default: false

  },

  rating: {

    type: Number,

    default: 0

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(
  'User',
  userSchema
)