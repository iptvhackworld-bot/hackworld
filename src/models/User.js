const mongoose =
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