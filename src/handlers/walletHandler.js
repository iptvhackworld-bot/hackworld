const { Markup } =
require('telegraf')

const {

  getBalance,

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| WALLET PANEL
|--------------------------------------------------------------------------
*/

const openWalletPanel =
async (ctx) => {

  try {

    const balance =
      await getBalance(
        ctx.from.id
      )

    logInfo(
      `WALLET_OPEN ${ctx.from.id}`
    )

    await ctx.reply(

`
🏦 HACKWORLD WALLET

━━━━━━━━━━━━━━━━━━

💰 Solde :
${balance}$

━━━━━━━━━━━━━━━━━━

🔒 Transactions sécurisées

💳 Dépôts

🏦 Retraits

📜 Historique

━━━━━━━━━━━━━━━━━━
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '➕ Déposer',
            'wallet_deposit'
          ),

          Markup.button.callback(
            '➖ Retirer',
            'wallet_withdraw'
          )

        ],

        [

          Markup.button.callback(
            '📜 Historique',
            'wallet_logs'
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
      'WALLET_HANDLER',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleWalletInput =
async (ctx) => {

  try {

    return false

  }

  catch (error) {

    logError(
      'WALLET_INPUT',
      error
    )

    return false

  }

}

module.exports = {

  openWalletPanel,

  handleWalletInput

}