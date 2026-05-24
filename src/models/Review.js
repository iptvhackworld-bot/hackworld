const mongoose =
require('mongoose')

const reviewSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | USERS
  |--------------------------------------------------------------------------
  */

  reviewerId: {

    type: Number,

    required: true

  },

  sellerId: {

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
  | REVIEW
  |--------------------------------------------------------------------------
  */

  rating: {

    type: Number,

    min: 1,

    max: 5,

    required: true

  },

  comment: {

    type: String,

    default: ''

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

  'Review',

  reviewSchema

)