const mongoose =
require('mongoose')

const casinoSchema =
new mongoose.Schema({

  userId: Number,

  wins: {

    type: Number,

    default: 0

  },

  losses: {

    type: Number,

    default: 0

  },

  totalBet: {

    type: Number,

    default: 0

  }

})

module.exports =
mongoose.model(

  'Casino',

  casinoSchema

)