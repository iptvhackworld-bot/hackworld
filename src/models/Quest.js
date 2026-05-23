const mongoose =
require('mongoose')

const questSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  userId: {

    type: Number,

    required: true

  },

  /*
  |--------------------------------------------------------------------------
  | QUEST
  |--------------------------------------------------------------------------
  */

  type: {

    type: String,

    required: true

  },

  description: {

    type: String,

    required: true

  },

  goal: {

    type: Number,

    default: 1

  },

  progress: {

    type: Number,

    default: 0

  },

  reward: {

    type: Number,

    default: 0

  },

  completed: {

    type: Boolean,

    default: false

  },

  /*
  |--------------------------------------------------------------------------
  | DATES
  |--------------------------------------------------------------------------
  */

  createdAt: {

    type: Date,

    default: Date.now

  }

})

claimed: {

  type: Boolean,

  default: false

},

module.exports =
mongoose.model(

  'Quest',

  questSchema

)