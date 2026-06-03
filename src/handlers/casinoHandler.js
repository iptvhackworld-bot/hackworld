const {

  playRoulette,

  playSlots,

  playBlackjack

} = require(
  '../services/casinoService'
)

const { Markup } =
require('telegraf')

const {

  logInfo,

  logError,

  logEconomy

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| CASINO PANEL
|--------------------------------------------------------------------------
*/

const openCasinoPanel =
async (ctx) => {

  try {

    logInfo(
      `CASINO_PANEL ${ctx.from.id}`
    )

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

        ],

        [

          Markup.button.callback(
            '🏠 Menu',
            'back_main_menu'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'CASINO_PANEL',
      error
    )

  }

}
/*
|--------------------------------------------------------------------------
| ROULETTE
|--------------------------------------------------------------------------
*/

const rouletteHandler =
async (ctx) => {

  try {

    const userId =
      ctx.from.id

    const amount =
      100

    logInfo(
      `CASINO_ROULETTE ${userId}`
    )

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

      logEconomy(
        `ROULETTE_WIN ${userId} +${amount}`
      )

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

    logEconomy(
      `ROULETTE_LOSS ${userId} -${amount}`
    )

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

  catch (error) {

    logError(
      'CASINO_ROULETTE',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| SLOTS
|--------------------------------------------------------------------------
*/

const slotsHandler =
async (ctx) => {

  try {

    const userId =
      ctx.from.id

    const amount =
      100

    const symbols = [

      '🍒',

      '🍋',

      '💎',

      '7️⃣'

    ]

    const spin = [

      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ],

      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ],

      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ]

    ]

    const win =

      spin[0] === spin[1]

      &&

      spin[1] === spin[2]

    if (win) {

      logEconomy(
        `SLOTS_WIN ${userId} +500`
      )

      return ctx.reply(

`
🎰 SLOTS

${spin.join(' | ')}

━━━━━━━━━━━━━━━━━━

🎉 JACKPOT

💰 Gain :
+500$

━━━━━━━━━━━━━━━━━━
`

      )

    }

    logEconomy(
      `SLOTS_LOSS ${userId} -${amount}`
    )

    return ctx.reply(

`
🎰 SLOTS

${spin.join(' | ')}

━━━━━━━━━━━━━━━━━━

💀 Perdu

💸 -100$

━━━━━━━━━━━━━━━━━━
`

    )

  }

  catch (error) {

    logError(
      'CASINO_SLOTS',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| BLACKJACK
|--------------------------------------------------------------------------
*/

const blackjackHandler =
async (ctx) => {

  try {

    const userId =
      ctx.from.id

    const player =

      Math.floor(
        Math.random() * 11
      ) + 11

    const dealer =

      Math.floor(
        Math.random() * 11
      ) + 11

    if (player > dealer) {

      logEconomy(
        `BLACKJACK_WIN ${userId} +250`
      )

      return ctx.reply(

`
🃏 BLACKJACK

━━━━━━━━━━━━━━━━━━

👤 Vous :
${player}

🤖 Dealer :
${dealer}

━━━━━━━━━━━━━━━━━━

🎉 Victoire

💰 +250$

━━━━━━━━━━━━━━━━━━
`

      )

    }

    logEconomy(
      `BLACKJACK_LOSS ${userId} -100`
    )

    return ctx.reply(

`
🃏 BLACKJACK

━━━━━━━━━━━━━━━━━━

👤 Vous :
${player}

🤖 Dealer :
${dealer}

━━━━━━━━━━━━━━━━━━

💀 Défaite

💸 -100$

━━━━━━━━━━━━━━━━━━
`

    )

  }

  catch (error) {

    logError(
      'CASINO_BLACKJACK',
      error
    )

  }

}

module.exports = {

  openCasinoPanel,

  rouletteHandler,

  slotsHandler,

  blackjackHandler

}