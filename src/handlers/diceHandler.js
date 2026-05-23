const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

if (!global.diceSessions) {

  global.diceSessions = {}

}

/*
|--------------------------------------------------------------------------
| OPEN DICE
|--------------------------------------------------------------------------
*/

const openDice =
async (ctx) => {

  global.diceSessions[
    ctx.from.id
  ] = true

  await ctx.reply(
`
🎲 DICE GAME

━━━━━━━━━━━━━━━━━━

💰 Entrez votre mise :
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleDiceInput =
async (ctx) => {

  const session =

    global.diceSessions[
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
❌ Mise invalide.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | PAYMENT
  |--------------------------------------------------------------------------
  */

  const paid =
    await removeMoney(

      ctx.from.id,

      amount,

      'Dice game'

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
  | DICE
  |--------------------------------------------------------------------------
  */

  const player =

    Math.floor(

      Math.random() * 6

    ) + 1

  const bot =

    Math.floor(

      Math.random() * 6

    ) + 1

  let won = false

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  if (

    player > bot

  ) {

    won = true

  }

  /*
  |--------------------------------------------------------------------------
  | PAYOUT
  |--------------------------------------------------------------------------
  */

  let winnings = 0

  if (won) {

    winnings =
      amount * 2

    await addMoney(

      ctx.from.id,

      winnings,

      'Dice win'

    )

  }

  delete global.diceSessions[
    ctx.from.id
  ]

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🎲 DICE RESULT

━━━━━━━━━━━━━━━━━━

👤 Vous :
${player}

🤖 Bot :
${bot}

━━━━━━━━━━━━━━━━━━

${won
? `✅ Gagné : ${winnings}$`
: `❌ Perdu : ${amount}$`}
`
  )

}

module.exports = {

  openDice,

  handleDiceInput

}