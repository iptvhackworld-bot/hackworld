const {

  addMoney

} = require(
  '../services/walletService'
)

const {

  addCrypto

} = require(
  '../services/cryptoService'
)

const {

  createSubscription

} = require(
  '../services/premiumService'
)

const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| REWARDS
|--------------------------------------------------------------------------
*/

const rewards = [

  {

    type: 'money',

    value: 50

  },

  {

    type: 'money',

    value: 100

  },

  {

    type: 'money',

    value: 500

  },

  {

    type: 'money',

    value: 1000

  },

  {

    type: 'crypto',

    value: 25

  },

  {

    type: 'vip',

    value: 7

  },

  {

    type: 'nothing',

    value: 0

  }

]

/*
|--------------------------------------------------------------------------
| SPIN
|--------------------------------------------------------------------------
*/

const spinWheel =
async (ctx) => {

  const user =
    await User.findOne({

      id: ctx.from.id

    })

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | COOLDOWN
  |--------------------------------------------------------------------------
  */

  if (user.lastSpin) {

    const diff =

      Date.now()

      -

      new Date(
        user.lastSpin
      ).getTime()

    const hours =
      diff / 1000 / 60 / 60

    if (hours < 24) {

      return ctx.reply(
`
⏳ Spin déjà utilisé.

🎡 Revenez demain.
`
      )

    }

  }

  /*
  |--------------------------------------------------------------------------
  | RANDOM
  |--------------------------------------------------------------------------
  */

  const reward =

    rewards[
      Math.floor(

        Math.random()

        *

        rewards.length

      )
    ]

  /*
  |--------------------------------------------------------------------------
  | APPLY
  |--------------------------------------------------------------------------
  */

  let message = ''

  if (

    reward.type ===
    'money'

  ) {

    await addMoney(

      ctx.from.id,

      reward.value,

      'Spin reward'

    )

    message =
`
💰 ${reward.value}$ gagnés
`

  }

  else if (

    reward.type ===
    'crypto'

  ) {

    await addCrypto(

      ctx.from.id,

      'usdt',

      reward.value

    )

    message =
`
💳 ${reward.value} USDT
gagnés
`

  }

  else if (

    reward.type ===
    'vip'

  ) {

    await createSubscription(

      ctx.from.id,

      'VIP',

      reward.value

    )

    message =
`
👑 VIP activé

📅 ${reward.value} jours
`

  }

  else {

    message =
`
❌ Aucun gain
`
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  user.lastSpin =
    new Date()

  await user.save()

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🎡 SPIN WHEEL

━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━

✅ Spin terminé
`
  )

}

module.exports = {

  spinWheel

}