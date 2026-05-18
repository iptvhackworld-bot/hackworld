const mongoose =
require('mongoose')

const shopSchema =
new mongoose.Schema({

  name: String,

  price: Number,

  description: String,

  stock: {

    type: Number,

    default: 0

  },

  category: String

})

module.exports =
mongoose.model(

  'Shop',

  shopSchema

)