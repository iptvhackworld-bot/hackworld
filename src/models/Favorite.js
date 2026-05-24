const mongoose =
require('mongoose')

const favoriteSchema =
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
  | LISTING
  |--------------------------------------------------------------------------
  */

  listingId: {

    type: mongoose.Schema.Types.ObjectId,

    required: true

  },

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'Favorite',

  favoriteSchema

)