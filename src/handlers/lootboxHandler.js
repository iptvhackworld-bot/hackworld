const { Markup } =
require('telegraf')

const {

  addMoney,

  removeMoney

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

/*
|--------------------------------------------------------------------------
| LOOTBOXES
|--------------------------------------------------------------------------
*/

const lootboxes = {

  common: {

    price: 100,

    rewards: [

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

        value: 250

      }

    ]

  },

  rare: {

    price: 500,

    rewards: [

      {

        type: 'money',

        value: 500

      },

      {

        type: 'crypto',

        value: 50

      },

      {

        type: 'vip',

        value: 7

      }

    ]

  },

  legendary: {

    price: 2500,

    rewards: [

      {

        type: 'money',

        value: 5000

      },

      {

        type: 'crypto',

        value: 500

      },

      {

        type: 'seller',

        value: 30

      }

    ]

  }

}

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openLootboxes =
async (ctx) => {

  await ctx.reply(

`
🎟 LOOTBOXES

━━━━━━━━━━━━━━━━━━

📦 Common :
100$

💎 Rare :
500$

👑 Legendary :
2500$

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '📦 Common',
      'lootbox_common'
    )

  ],

  [

    Markup.button.callback(
      '💎 Rare',
      'lootbox_rare'
    )

  ],

  [

    Markup.button.callback(
      '👑 Legendary',
      'lootbox_legendary'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| OPEN LOOTBOX
|--------------------------------------------------------------------------
*/

const openLootboxReward =
async (

  ctx,

  type

) => {

  const box =
    lootboxes[type]

  if (!box) {

    return

  }

  /*
  |--------------------------------------------------------------------------
  | PAYMENT
  |--------------------------------------------------------------------------
  */

  const paid =
    await removeMoney(

      ctx.from.id,

      box.price,

      'Lootbox purchase'

    )

  if (!paid) {

    return ctx.reply(
`
❌ Fonds insuffisants.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | RANDOM REWARD
  |--------------------------------------------------------------------------
  */

  const reward =

    box.rewards[
      Math.floor(

        Math.random()

        *

        box.rewards.length

      )
    ]

  let message = ''

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  if (

    reward.type ===
    'money'

  ) {

    await addMoney(

      ctx.from.id,

      reward.value,

      'Lootbox reward'

    )

    message =
`
💰 ${reward.value}$ gagnés
`

  }

  /*
  |--------------------------------------------------------------------------
  | CRYPTO
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | VIP
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | SELLER+
  |--------------------------------------------------------------------------
  */

  else if (

    reward.type ===
    'seller'

  ) {

    await createSubscription(

      ctx.from.id,

      'SELLER+',

      reward.value

    )

    message =
`
🚀 SELLER+ activé

📅 ${reward.value} jours
`

  }

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🎟 LOOTBOX OPENED

━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━

🎉 Félicitations
`
  )

}

module.exports = {

  openLootboxes,

  openLootboxReward

}