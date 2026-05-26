const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| MAIN MENU
|--------------------------------------------------------------------------
*/

const showMainMenu =
async (ctx) => {

  await ctx.reply(

`
🚀 HACKWORLD MARKETPLACE

━━━━━━━━━━━━━━━━━━

✅ Marketplace sécurisé
✅ Paiements crypto
✅ Premium system

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🛒 Marketplace',
          'market_panel'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

const startHandler =
async (ctx) => {

  await ctx.reply(

`
📜 Bienvenue sur HackWorld

━━━━━━━━━━━━━━━━━━

⚠️ Aucun staff ne vous contactera en privé.

⚠️ Vérifiez toujours les comptes officiels.

━━━━━━━━━━━━━━━━━━

Cliquez sur ACCEPTER pour continuer.
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '✅ ACCEPTER',
          'accept_rules'
        )

      ]

    ])

  )

}

module.exports = {

  startHandler,

  showMainMenu

}