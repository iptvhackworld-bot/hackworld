const mongoose =
require('mongoose')

const shopItemSchema =
new mongoose.Schema({

  name: String,

  description: String,

  price: Number,

  rarity: {

    type: String,

    default: 'common'

  },

  category: String,

  emoji: String,

  stock: {

    type: Number,

    default: -1

  },

  limited: {

    type: Boolean,

    default: false

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'ShopItem',

  shopItemSchema

)