const { Markup } =
require('telegraf')

const {

  createSubscription,

  checkPremium

} = require(
  '../services/premiumService'
)

const {

  removeMoney

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| PREMIUM PANEL
|--------------------------------------------------------------------------
*/

const openPremiumPanel =
async (ctx) => {

  const sub =
    await checkPremium(

      ctx.from.id

    )

  let status =
    '❌ Aucun abonnement'

  if (sub) {

    status =
`
✅ ${sub.plan}

📅 expire :
${sub.expiresAt.toDateString()}
`
  }

  await ctx.reply(

`
👑 PREMIUM SYSTEM

━━━━━━━━━━━━━━━━━━

${status}

━━━━━━━━━━━━━━━━━━

VIP :
10$

PREMIUM :
25$

SELLER+ :
50$

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '👑 VIP',
      'buy_vip'
    )

  ],

  [

    Markup.button.callback(
      '💎 PREMIUM',
      'buy_premium'
    )

  ],

  [

    Markup.button.callback(
      '🚀 SELLER+',
      'buy_seller_plus'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| BUY PLAN
|--------------------------------------------------------------------------
*/

const buyPremiumPlan =
async (

  ctx,

  plan,

  price,

  days

) => {

  const paid =
    await removeMoney(

      ctx.from.id,

      price,

      `Premium ${plan}`

    )

  if (!paid) {

    return ctx.reply(
`
❌ Fonds insuffisants.
`
    )

  }

  await createSubscription(

    ctx.from.id,

    plan,

    days

  )

  await ctx.reply(
`
✅ Abonnement activé.

👑 ${plan}

📅 ${days} jours
`
  )

}

module.exports = {

  openPremiumPanel,

  buyPremiumPlan

}