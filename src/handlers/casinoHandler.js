const {

  playRoulette

} = require(
  '../services/casinoService'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| CASINO PANEL
|--------------------------------------------------------------------------
*/

const openCasinoPanel =
async (ctx) => {

  await ctx.reply(

`
🎰 CASINO PANEL

━━━━━━━━━━━━━━━━━━

Choisissez un jeu

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🎲 Roulette',
          'casino_roulette'
        )

      ],

      [

        Markup.button.callback(
          '🎰 Slots',
          'casino_slots'
        )

      ],

      [

        Markup.button.callback(
          '🃏 Blackjack',
          'casino_blackjack'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| ROULETTE
|--------------------------------------------------------------------------
*/

const rouletteHandler =
async (ctx) => {

  const userId =
    ctx.from.id

  const amount =
    100

  const result =
    await playRoulette(

      userId,

      amount

    )

  if (result.error) {

    return ctx.reply(
`
❌ ${result.error}
`
    )

  }

  if (result.win) {

    return ctx.reply(
`
🎉 VICTOIRE

💰 Gain :
+${amount}

💵 Argent :
${result.money}
`
    )

  }

  return ctx.reply(
`
💀 PERDU

💸 Perte :
-${amount}

💵 Argent :
${result.money}
`
  )

}

module.exports = {

  openCasinoPanel,

  rouletteHandler

}