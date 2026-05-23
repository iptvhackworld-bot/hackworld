const mongoose =
require('mongoose')

const userSchema =
new mongoose.Schema({

  /*
  |--------------------------------------------------------------------------
  | TELEGRAM
  |--------------------------------------------------------------------------
  */

  id: {

    type: Number,

    unique: true,

    required: true

  },

  username: {

    type: String

  },

  firstName: {

    type: String

  },

  /*
  |--------------------------------------------------------------------------
  | ECONOMY
  |--------------------------------------------------------------------------
  */

  money: {

    type: Number,

    default: 0

  },

  xp: {

    type: Number,

    default: 0

  },

  /*
  |--------------------------------------------------------------------------
  | CASINO
  |--------------------------------------------------------------------------
  */

  casinoPlayed: {

    type: Number,

    default: 0

  },

  casinoWon: {

    type: Number,

    default: 0

  },

  /*
  |--------------------------------------------------------------------------
  | ADMIN
  |--------------------------------------------------------------------------
  */

  role: {

    type: String,

    default: 'user'

  },

  banned: {

    type: Boolean,

    default: false

  },

  warns: {

    type: Number,

    default: 0

  },

  muted: {

    type: Boolean,

    default: false

  },

  blacklisted: {

    type: Boolean,

    default: false

  },

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  messages: {

    type: Number,

    default: 0

  },

  rating: {

    type: Number,

    default: 0

  },

/*
|--------------------------------------------------------------------------
| MARKETPLACE
|--------------------------------------------------------------------------
*/

sellerRating: {

  type: Number,

  default: 5

},

sellerReviews: {

  type: Number,

  default: 0

},

sellerSales: {

  type: Number,

  default: 0

},

trustedSeller: {

  type: Boolean,

  default: false

},

verifiedSeller: {

  type: Boolean,

  default: false

},

trustScore: {

  type: Number,

  default: 0

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

/*
|--------------------------------------------------------------------------
| VERIFICATION
|--------------------------------------------------------------------------
*/

verifiedSeller: {

  type: Boolean,

  default: false

},

trustScore: {

  type: Number,

  default: 0

},

/*
|--------------------------------------------------------------------------
| DAILY REWARDS
|--------------------------------------------------------------------------
*/

dailyStreak: {

  type: Number,

  default: 0

},

lastDaily: {

  type: Date,

  default: null

},

/*
|--------------------------------------------------------------------------
| SPIN
|--------------------------------------------------------------------------
*/

lastSpin: {

  type: Date,

  default: null

},

/*
|--------------------------------------------------------------------------
| LEVEL SYSTEM
|--------------------------------------------------------------------------
*/

level: {

  type: Number,

  default: 1

},

prestige: {

  type: Number,

  default: 0

},

module.exports =
mongoose.model(

  'User',

  userSchema

)