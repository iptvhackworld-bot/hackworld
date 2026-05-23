const { Markup } =
require('telegraf')

const {

  getWallet,

  getTransactions

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| WALLET PANEL
|--------------------------------------------------------------------------
*/

const openWallet =
async (ctx) => {

  const wallet =
    await getWallet(
      ctx.from.id
    )

  await ctx.reply(

`
🏦 WALLET HACKWORLD

━━━━━━━━━━━━━━━━━━

💰 Balance :
${wallet.balance}$

━━━━━━━━━━━━━━━━━━

📥 Dépôts :
${wallet.totalDeposits}$

📤 Retraits :
${wallet.totalWithdraws}$

💸 Envoyé :
${wallet.totalSent}$

📨 Reçu :
${wallet.totalReceived}$

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '📜 Historique',
          'wallet_history'
        )

      ],

      [

        Markup.button.callback(
          '💸 Transfer',
          'wallet_transfer'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| HISTORY
|--------------------------------------------------------------------------
*/

const walletHistory =
async (ctx) => {

  const transactions =
    await getTransactions(
      ctx.from.id
    )

  if (

    !transactions.length

  ) {

    return ctx.reply(
`
❌ Aucune transaction.
`
    )

  }

  let text =
`
📜 HISTORIQUE WALLET

━━━━━━━━━━━━━━━━━━
`

  transactions.forEach((tx) => {

    text +=
`
💰 ${tx.amount}$

📌 ${tx.type}

📝 ${tx.description}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

module.exports = {

  openWallet,

  walletHistory

}