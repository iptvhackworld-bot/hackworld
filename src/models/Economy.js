const mongoose =
require('mongoose')

const economySchema =
new mongoose.Schema({

  userId: Number,

  balance: {

    type: Number,

    default: 0

  },

  bank: {

    type: Number,

    default: 0

  }

})

module.exports =
mongoose.model(

  'Economy',

  economySchema

)