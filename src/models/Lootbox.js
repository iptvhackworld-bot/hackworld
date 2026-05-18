const mongoose =
require('mongoose')

const lootboxSchema =
new mongoose.Schema({

  name: String,

  rewards: [

    {

      item: String,

      chance: Number

    }

  ]

})

module.exports =
mongoose.model(

  'Lootbox',

  lootboxSchema

)