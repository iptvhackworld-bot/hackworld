const mongoose =
require('mongoose')

/*
|--------------------------------------------------------------------------
| CONTENT SCHEMA
|--------------------------------------------------------------------------
*/

const contentSchema =
new mongoose.Schema({

  text: {

    type: String,

    required: true

  },

  author: {

    type: String,

    default: 'Unknown'

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'Content',

  contentSchema

)