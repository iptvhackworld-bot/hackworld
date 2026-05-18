const mongoose =
require('mongoose')

const staffSchema =
new mongoose.Schema({

  userId: Number,

  role: String,

  permissions: [

    String

  ]

})

module.exports =
mongoose.model(

  'Staff',

  staffSchema

)