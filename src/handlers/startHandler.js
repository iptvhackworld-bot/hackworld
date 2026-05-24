const { Markup } =
require('telegraf')

const {

  getTotalUsers,

  getTotalUses,

  getAverageRating

} = require(
  '../services/statsService'
)

const fs =
require('fs')

/*
|--------------------------------------------------------------------------
| MAIN MENU
|--------------------------------------------------------------------------
*/

const showMainMenu =
async (ctx) => {

  const totalUsers =
    await getTotalUsers()

  const totalUses =
    getTotalUses()

  const averageRating =
    await getAverageRating()

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
╔══════════════════╗
      HACKWORLD
╚══════════════════╝

🛒 MARKETPLACE HACKWORLD

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

🚀 Utilisations :
${totalUses}

⭐ Note moyenne :
${averageRating}/5

━━━━━━━━━━━━━━━━━━

✅ Système opérationnel
🔒 Sécurité active
👤 Connecté avec succès

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
            '📜 Annonces',
            'view_market'
          ),

          Markup.button.callback(
            '➕ Créer',
            'create_listing'
          )

        ],

        [

          Markup.button.callback(
            '❤️ Favoris',
            'favorites_panel'
          ),

          Markup.button.callback(
            '📂 Catégories',
            'market_categories'
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
          )

        ],

        [

          Markup.button.callback(
            '👑 Premium',
            'premium_panel'
          ),

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

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

const startHandler =
async (ctx) => {

  await ctx.replyWithPhoto(

    {

      source:
      fs.createReadStream(

        'src/assets/hackworld.jpg'

      )

    }

  )

  await ctx.reply(

`
📜 BIENVENUE SUR HACKWORLD

━━━━━━━━━━━━━━━━━━

✅ Marketplace sécurisé
✅ Escrow disponible
✅ Paiements crypto
✅ Système premium
✅ Support actif

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

      ],

      [

        Markup.button.callback(
          '❌ REFUSER',
          'decline_rules'
        )

      ]

    ])

  )

}

module.exports = {

  startHandler,

  showMainMenu

}