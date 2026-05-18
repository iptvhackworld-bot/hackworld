const {

  addWin,

  addLoss,

  getCasinoStats

} = require(
  '../services/casinoService'
)

const {

  addMoney,

  removeMoney

} = require(
  '../services/economyService'
)

/*
|--------------------------------------------------------------------------
| CASINO PANEL
|--------------------------------------------------------------------------
*/

const openCasino =
async (ctx) => {

  const stats =
    await getCasinoStats(

      ctx.from.id

    )

  await ctx.reply(
`
🎰 CASINO

━━━━━━━━━━━━━━━━━━

🏆 Victoires :
${stats.wins}

💀 Défaites :
${stats.losses}

🎲 Total joué :
${stats.totalBet}

━━━━━━━━━━━━━━━━━━

🎰 Commande :
/bet montant
`
  )

}

/*
|--------------------------------------------------------------------------
| BET
|--------------------------------------------------------------------------
*/

const playCasino =
async (

  ctx,

  amount

) => {

  amount =
    Number(amount)

  /*
  |--------------------------------------------------------------------------
  | INVALID
  |--------------------------------------------------------------------------
  */

  if (

    isNaN(amount)

    ||

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
  | RANDOM
  |--------------------------------------------------------------------------
  */

  const win =
    Math.random() > 0.5

  /*
  |--------------------------------------------------------------------------
  | WIN
  |--------------------------------------------------------------------------
  */

  if (win) {

    await addMoney(

      ctx.from.id,

      amount

    )

    await addWin(

      ctx.from.id,

      amount

    )

    return ctx.reply(
`
🎉 GAGNÉ

💰 +${amount}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | LOSS
  |--------------------------------------------------------------------------
  */

  await removeMoney(

    ctx.from.id,

    amount

  )

  await addLoss(

    ctx.from.id,

    amount

  )

  return ctx.reply(
`
💀 PERDU

💸 -${amount}
`
  )

}

module.exports = {

  openCasino,

  playCasino

}