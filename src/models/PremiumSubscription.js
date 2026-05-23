const mongoose =
require('mongoose')

const premiumSubscriptionSchema =
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
  | PLAN
  |--------------------------------------------------------------------------
  */

  plan: {

    type: String,

    required: true

  },

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  active: {

    type: Boolean,

    default: true

  },

  /*
  |--------------------------------------------------------------------------
  | DATES
  |--------------------------------------------------------------------------
  */

  expiresAt: {

    type: Date,

    required: true

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'PremiumSubscription',

  premiumSubscriptionSchema

)