const mongoose =
require('mongoose')

const casinoSchema =
new mongoose.Schema({

  userId: Number,

  game: String,

  amount: Number,

  result: String,

  profit: Number,

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'CasinoHistory',

  casinoSchema

)