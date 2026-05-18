const mongoose =
require('mongoose')

const inventorySchema =
new mongoose.Schema({

  userId: {

    type: Number,

    required: true

  },

  items: [

    {

      name: String,

      quantity: {

        type: Number,

        default: 1

      }

    }

  ]

})

module.exports =
mongoose.model(

  'Inventory',

  inventorySchema

)