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
            '👑 Premium',
            'premium_panel'
          )

        ]

      ])

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

module.exports = {

  startHandler,

  showMainMenu

}