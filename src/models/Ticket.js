const mongoose =
require('mongoose')

const ticketSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  userId: {

    type: Number,

    required: true

  },

  username: {

    type: String,

    default: 'Unknown'

  },

  /*
  |--------------------------------------------------------------------------
  | TICKET
  |--------------------------------------------------------------------------
  */

  reason: {

    type: String,

    default: 'Aucune raison'

  },

  status: {

    type: String,

    default: 'open'

  },

  adminReply: {

    type: String,

    default: null

  },

  /*
  |--------------------------------------------------------------------------
  | DATES
  |--------------------------------------------------------------------------
  */

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'Ticket',

  ticketSchema

)