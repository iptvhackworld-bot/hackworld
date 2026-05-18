const mongoose =
require('mongoose')

const sanctionSchema =
new mongoose.Schema({

  userId: Number,

  adminId: Number,

  type: String,

  reason: String,

  duration: String,

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'Sanction',

  sanctionSchema
)