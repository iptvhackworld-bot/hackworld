const mongoose =
require('mongoose')

const petSchema =
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
  | PET
  |--------------------------------------------------------------------------
  */

  name: {

    type: String,

    required: true

  },

  rarity: {

    type: String,

    default: 'common'

  },

  bonusType: {

    type: String,

    required: true

  },

  bonusValue: {

    type: Number,

    default: 0

  },

  level: {

    type: Number,

    default: 1

  },

  xp: {

    type: Number,

    default: 0

  },

  /*
  |--------------------------------------------------------------------------
  | ACTIVE
  |--------------------------------------------------------------------------
  */

  active: {

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

module.exports =
mongoose.model(

  'Pet',

  petSchema

)