const mongoose =
require('mongoose')

const walletSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  userId: {

    type: Number,

    required: true,

    unique: true

  },

  /*
  |--------------------------------------------------------------------------
  | BALANCE
  |--------------------------------------------------------------------------
  */

  balance: {

    type: Number,

    default: 0

  },

  /*
  |--------------------------------------------------------------------------
  | SECURITY
  |--------------------------------------------------------------------------
  */

  locked: {

    type: Boolean,

    default: false

  },

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  totalDeposits: {

    type: Number,

    default: 0

  },

  totalWithdraws: {

    type: Number,

    default: 0

  },

  totalSent: {

    type: Number,

    default: 0

  },

  totalReceived: {

    type: Number,

    default: 0

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

  'Wallet',

  walletSchema

)