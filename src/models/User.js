```js
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

    type: String,

    default: ''

  },

  firstName: {

    type: String,

    default: ''

  },

  /*
  |--------------------------------------------------------------------------
  | PROFILE
  |--------------------------------------------------------------------------
  */

  title: {

    type: String,

    default: 'Member'

  },

  level: {

    type: Number,

    default: 1

  },

  xp: {

    type: Number,

    default: 0

  },

  reputation: {

    type: Number,

    default: 0

  },

  joinDate: {

    type: Date,

    default: Date.now

  },

  lastSeen: {

    type: Date,

    default: Date.now

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

  totalEarned: {

    type: Number,

    default: 0

  },

  totalSpent: {

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

  casinoLost: {

    type: Number,

    default: 0

  },

  biggestWin: {

    type: Number,

    default: 0

  },

  biggestLoss: {

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

  muted: {

    type: Boolean,

    default: false

  },

  blacklisted: {

    type: Boolean,

    default: false

  },

  warningCount: {

    type: Number,

    default: 0

  },

  muteCount: {

    type: Number,

    default: 0

  },

  banCount: {

    type: Number,

    default: 0

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

  /*
  |--------------------------------------------------------------------------
  | MARKETPLACE
  |--------------------------------------------------------------------------
  */

  purchaseCount: {

    type: Number,

    default: 0

  },

  pendingPurchases: {

    type: Number,

    default: 0

  },

  completedPurchases: {

    type: Number,

    default: 0

  },

  soldCount: {

    type: Number,

    default: 0

  },

  salesCount: {

    type: Number,

    default: 0

  },

  totalSalesMoney: {

    type: Number,

    default: 0

  },

  favoriteCount: {

    type: Number,

    default: 0

  },

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
  | DAILY
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
  | INVENTORY
  |--------------------------------------------------------------------------
  */

  inventory: {

    type: Array,

    default: []

  },

  badges: {

    type: Array,

    default: []

  },

  achievements: {

    type: Array,

    default: []

  },

  /*
  |--------------------------------------------------------------------------
  | PREMIUM
  |--------------------------------------------------------------------------
  */

  vip: {

    type: Boolean,

    default: false

  },

  verified: {

    type: Boolean,

    default: false

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

  'User',

  userSchema

)
```
