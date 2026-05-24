const { Markup } =
require('telegraf')

const {

  getBalance,

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
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

    await ctx.reply(

`
🏦 HACKWORLD WALLET

━━━━━━━━━━━━━━━━━━

💰 Solde :
${balance}$

━━━━━━━━━━━━━━━━━━

🔒 Transactions sécurisées
`
,

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

        ]

      ])

    )

  } catch (error) {

    console.log(error)

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

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openWalletPanel,

  handleWalletInput

}