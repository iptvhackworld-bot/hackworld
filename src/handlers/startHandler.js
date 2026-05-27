const { Markup } =
require('telegraf')

const fs =
require('fs')

/*
|--------------------------------------------------------------------------
| MAIN MENU
|--------------------------------------------------------------------------
*/

const showMainMenu =
async (ctx) => {

  try {

    await ctx.replyWithPhoto(

      {

        source:
        fs.createReadStream(
          'src/assets/hackworld.jpg'
        )

      },

      {

        caption:
`
🚀 HACKWORLD MARKETPLACE

━━━━━━━━━━━━━━━━━━

✅ Marketplace sécurisé
✅ Paiements crypto
✅ Premium system
✅ Notifications temps réel

━━━━━━━━━━━━━━━━━━
`,

        ...Markup.inlineKeyboard([

  [
    Markup.button.callback(
      '🛒 Marketplace',
      'market_panel'
    )
  ],

  [
    Markup.button.callback(
      '👤 Profil',
      'profile_panel'
    ),

    Markup.button.callback(
      '🏦 Wallet',
      'wallet_panel'
    )
  ],

  [
    Markup.button.callback(
      '🎁 Daily',
      'daily_reward'
    ),

    Markup.button.callback(
      '🏆 Leaderboards',
      'leaderboards'
    )
  ],

  [
    Markup.button.callback(
      '🎰 Casino',
      'casino_panel'
    ),

    Markup.button.callback(
      '⭐ Favoris',
      'favorites_panel'
    )
  ],

  [
    Markup.button.callback(
      '🔔 Notifications',
      'notifications_panel'
    ),

    Markup.button.callback(
      '👑 Premium',
      'premium_panel'
    )
  ],

  [
    Markup.button.callback(
      '💳 Crypto',
      'crypto_panel'
    )
  ],

  [
    Markup.button.callback(
      '🎫 Support',
      'support_panel'
    )
  ],

  [
    Markup.button.callback(
      '⚙️ Admin',
      'admin_panel'
    )
  ]

])

      }

    )

  }

  catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

const startHandler =
async (ctx) => {

  try {

    await ctx.replyWithPhoto(

      {

        source:
        fs.createReadStream(
          'src/assets/hackworld.jpg'
        )

      },

      {

        caption:
`
📜 Bienvenue sur HackWorld

━━━━━━━━━━━━━━━━━━

⚠️ Aucun staff ne vous contactera en privé.

⚠️ Vérifiez toujours les comptes officiels.

━━━━━━━━━━━━━━━━━━

Cliquez sur ACCEPTER pour continuer.
`,

        ...Markup.inlineKeyboard([

          [

            Markup.button.callback(
              '✅ ACCEPTER',
              'accept_rules'
            )

          ],

          [

            Markup.button.callback(
              '❌ REFUSER',
              'decline_rules'
            )

          ]

        ])

      }

    )

  }

  catch (error) {

    console.log(error)

  }

}

module.exports = {

  startHandler,

  showMainMenu

}