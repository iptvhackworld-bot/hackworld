const mongoose =
require('mongoose')

const inventorySchema =
new mongoose.Schema({

  userId: Number,

  items: [

    {

      itemId: String,

      name: String,

      emoji: String,

      rarity: String,

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