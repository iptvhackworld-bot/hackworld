const User =
require(
  '../models/User'
)

const getTopUsers =
async () => {

  return await User.find()
  .sort({

    messages: -1

  })
  .limit(10)

}

const getRichestUsers =
async () => {

  return await User.find()
  .sort({

    money: -1

  })
  .limit(10)

}

const getTopGamblers =
async () => {

  return await User.find()
  .sort({

    casinoPlayed: -1

  })
  .limit(10)

}

module.exports = {

  getTopUsers,

  getRichestUsers,

  getTopGamblers

}