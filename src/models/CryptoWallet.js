const mongoose =
require('mongoose')

const cryptoWalletSchema =
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
  | BALANCES
  |--------------------------------------------------------------------------
  */

  btc: {

    type: Number,

    default: 0

  },

  eth: {

    type: Number,

    default: 0

  },

  usdt: {

    type: Number,

    default: 0

  },

  ltc: {

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

  'CryptoWallet',

  cryptoWalletSchema

)