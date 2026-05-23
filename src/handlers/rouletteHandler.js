const { Markup } =
require('telegraf')

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| SESSIONS
|--------------------------------------------------------------------------
*/

if (!global.rouletteSessions) {

  global.rouletteSessions = {}

}

/*
|--------------------------------------------------------------------------
| OPEN ROULETTE
|--------------------------------------------------------------------------
*/

const openRoulette =
async (ctx) => {

  await ctx.reply(

`
🎰 ROULETTE

━━━━━━━━━━━━━━━━━━

🔴 Rouge x2
⚫ Noir x2
🟢 Vert x14

━━━━━━━━━━━━━━━━━━

Choisissez couleur :
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '🔴 Rouge',
      'roulette_red'
    )

  ],

  [

    Markup.button.callback(
      '⚫ Noir',
      'roulette_black'
    )

  ],

  [

    Markup.button.callback(
      '🟢 Vert',
      'roulette_green'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| ASK BET
|--------------------------------------------------------------------------
*/

const askRouletteBet =
async (

  ctx,

  color

) => {

  global.rouletteSessions[
    ctx.from.id
  ] = {

    color

  }

  await ctx.reply(
`
💰 Montant pari :
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleRouletteInput =
async (ctx) => {

  const session =

    global.rouletteSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  const amount =
    Number(
      ctx.message.text
    )

  if (

    isNaN(amount) ||

    amount <= 0

  ) {

    return ctx.reply(
`
❌ Montant invalide.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE MONEY
  |--------------------------------------------------------------------------
  */

  const paid =
    await removeMoney(

      ctx.from.id,

      amount,

      'Roulette bet'

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
  | RESULT
  |--------------------------------------------------------------------------
  */

  const colors = [

    'red',

    'black',

    'red',

    'black',

    'red',

    'black',

    'green'

  ]

  const result =

    colors[
      Math.floor(

        Math.random()

        *

        colors.length

      )
    ]

  /*
  |--------------------------------------------------------------------------
  | WIN
  |--------------------------------------------------------------------------
  */

  let won =
    false

  let multiplier =
    0

  if (

    result ===
    session.color

  ) {

    won = true

    multiplier =

      result ===
      'green'

      ? 14

      : 2

  }

  /*
  |--------------------------------------------------------------------------
  | PAYOUT
  |--------------------------------------------------------------------------
  */

  let winnings =
    0

  if (won) {

    winnings =
      amount *
      multiplier

    await addMoney(

      ctx.from.id,

      winnings,

      'Roulette win'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const user =
    await User.findOne({

      id: ctx.from.id

    })

  if (user) {

    user.casinoPlayed +=
      1

    if (won) {

      user.casinoWon +=
        1

    }

    await user.save()

  }

  /*
  |--------------------------------------------------------------------------
  | CLEAN
  |--------------------------------------------------------------------------
  */

  delete global.rouletteSessions[
    ctx.from.id
  ]

  /*
  |--------------------------------------------------------------------------
  | RESULT MESSAGE
  |--------------------------------------------------------------------------
  */

  const emoji =

    result === 'red'
    ? '🔴'

    : result === 'black'
    ? '⚫'

    : '🟢'

  await ctx.reply(
`
🎰 Roulette

━━━━━━━━━━━━━━━━━━

Résultat :

${emoji}

━━━━━━━━━━━━━━━━━━

${won
? `✅ Gagné : ${winnings}$`
: `❌ Perdu : ${amount}$`}
`
  )

}

module.exports = {

  openRoulette,

  askRouletteBet,

  handleRouletteInput

}