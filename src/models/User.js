const mongoose =
require('mongoose')

const userSchema =
new mongoose.Schema({

  id: {

    type: Number,

    required: true,

    unique: true

  },

  username: {

    type: String,

    default: 'Unknown'

  },

  firstName: {

    type: String,

    default: ''

  },

  lastName: {

    type: String,

    default: ''

  },

  photo: {

    type: String,

    default: ''

  },

  money: {

    type: Number,

    default: 0

  },

  xp: {

    type: Number,

    default: 0

  },

  warns: {

    type: Number,

    default: 0

  },

  messages: {

    type: Number,

    default: 0

  },

  casinoPlayed: {

    type: Number,

    default: 0

  },

  casinoWon: {

    type: Number,

    default: 0

  },

  purchases: {

    type: Number,

    default: 0

  },

  badges: [

    String

  ],

  role: {

    type: String,

    default: 'user'

  },

  banned: {

    type: Boolean,

    default: false

  },

  lastActivity: {

    type: Date,

    default: Date.now

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

})

module.exports =
mongoose.model(

  'User',

  userSchema

)