const {

  getEconomy

} = require(
  '../services/economyService'
)

/*
|--------------------------------------------------------------------------
| ECONOMY PANEL
|--------------------------------------------------------------------------
*/

const openEconomy =
async (ctx) => {

  const economy =
    await getEconomy(

      ctx.from.id

    )

  await ctx.reply(
`
💰 ECONOMY

━━━━━━━━━━━━━━━━━━

💵 Wallet :
${economy.balance}

🏦 Bank :
${economy.bank}

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  openEconomy

}