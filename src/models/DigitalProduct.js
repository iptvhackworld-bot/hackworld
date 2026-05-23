const mongoose =
require('mongoose')

const digitalProductSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | LINKED MARKET ITEM
  |--------------------------------------------------------------------------
  */

  listingId: {

    type: String,

    required: true

  },

  /*
  |--------------------------------------------------------------------------
  | PRODUCT DATA
  |--------------------------------------------------------------------------
  */

  content: {

    type: String,

    required: true

  },

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  delivered: {

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

  'DigitalProduct',

  digitalProductSchema

)