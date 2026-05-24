const mongoose =
require('mongoose')

const purchaseSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | BUYER
  |--------------------------------------------------------------------------
  */

  buyerId: {

    type: Number,

    required: true

  },

  buyerUsername: {

    type: String,

    default: ''

  },

  /*
  |--------------------------------------------------------------------------
  | SELLER
  |--------------------------------------------------------------------------
  */

  sellerId: {

    type: Number,

    required: true

  },

  sellerUsername: {

    type: String,

    default: ''

  },

  /*
  |--------------------------------------------------------------------------
  | PRODUCT
  |--------------------------------------------------------------------------
  */

  listingId: {

    type: mongoose.Schema.Types.ObjectId,

    required: true

  },

  title: {

    type: String,

    default: ''

  },

  category: {

    type: String,

    default: 'Other'

  },

  price: {

    type: Number,

    default: 0

  },

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  status: {

    type: String,

    default: 'completed'

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

  'Purchase',

  purchaseSchema

)