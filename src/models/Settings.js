const mongoose =
require('mongoose')

const settingsSchema =
new mongoose.Schema({

  marketplace: {

    type: Boolean,

    default: true

  },

  casino: {

    type: Boolean,

    default: true

  },

  support: {

    type: Boolean,

    default: true

  },

  daily: {

    type: Boolean,

    default: true

  },

  notifications: {

    type: Boolean,

    default: true

  },

  maintenance: {

    type: Boolean,

    default: false

  }

})

module.exports =
mongoose.model(
  'Settings',
  settingsSchema
)