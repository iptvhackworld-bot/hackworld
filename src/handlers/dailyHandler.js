const {

  getUser,

  addMoney,

  addXP,

  updateUser

} = require(
  '../services/userService'
)

const economy =
require(
  '../config/economy'
)

const randomReward =
require(
  '../utils/randomReward'
)

const formatMoney =
require(
  '../utils/formatMoney'
)

/*
|--------------------------------------------------------------------------
| DAILY REWARD
|--------------------------------------------------------------------------
*/

const dailyReward =
async (ctx) => {

  const user =
    getUser(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return ctx.reply(
      '❌ Utilisateur introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const now =
    Date.now()

  const lastDaily =
    user.lastDaily || 0

  const cooldown =
    24 * 60 * 60 * 1000

  /*
  |--------------------------------------------------------------------------
  | COOLDOWN
  |--------------------------------------------------------------------------
  */

  if (
    now - lastDaily <
    cooldown
  ) {

    return ctx.reply(
`
⏳ Daily déjà récupéré.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | RANDOM MONEY
  |--------------------------------------------------------------------------
  */

  const rewards = [

    economy.DAILY_MIN,

    economy.DAILY_MAX,

    250,

    350,

    450

  ]

  const amount =
    randomReward(rewards)

  /*
  |--------------------------------------------------------------------------
  | REWARD
  |--------------------------------------------------------------------------
  */

  addMoney(
    ctx.from.id,
    amount
  )

  addXP(
    ctx.from.id,
    25
  )

  updateUser(
    ctx.from.id,
    {
      lastDaily: now
    }
  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🎁 DAILY REWARD

━━━━━━━━━━━━━━━━━━

💰 +${formatMoney(amount)} coins

⭐ +25 XP
`
  )

}

module.exports = {

  dailyReward

}