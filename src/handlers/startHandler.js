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
| IMAGE
|--------------------------------------------------------------------------
*/

await ctx.replyWithPhoto(

  {

    source:
    fs.createReadStream(

      'src/assets/hackworld.jpg'

    )

  },

  {

    caption:

/*
|--------------------------------------------------------------------------
| MAIN MENU
|--------------------------------------------------------------------------
*/

const showMainMenu =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const totalUsers =
    await getTotalUsers()

  const totalUses =
    getTotalUses()

  const averageRating =
    await getAverageRating()

  /*
  |--------------------------------------------------------------------------
  | MENU
  |--------------------------------------------------------------------------
  */

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

⚡ INTERFACE PRINCIPALE
━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

🚀 Utilisations :
${totalUses}

⭐ Note moyenne :
${averageRating}/5

━━━━━━━━━━━━━━━━━━

👤 Utilisateur connecté
🛡 Accès sécurisé activé
🚀 Système opérationnel

━━━━━━━━━━━━━━━━━━
`,

      ...Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '🛠 Tool',
            'cat_tool'
          ),

          Markup.button.callback(
            '📤 Partage',
            'cat_partage'
          )

        ],

        [

          Markup.button.callback(
            '🎓 Formation',
            'cat_formation'
          ),

          Markup.button.callback(
            '🎁 Gratuit',
            'cat_gratuit'
          )

        ],

        [

          Markup.button.callback(
            '🤝 Partenaire',
            'cat_partenaire'
          ),

          Markup.button.callback(
            '📢 Pub',
            'cat_pub'
          )

        ],

        [

          Markup.button.callback(
            '👥 Nos Groupes',
            'cat_nosgroupes'
          )

        ],

        [

          Markup.button.callback(
            '👑 Staff',
            'cat_staff'
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
            '🎒 Inventaire',
            'inventory'
          )

        ],

        [

          Markup.button.callback(
            '👤 Profil',
            'profile_menu'
          )

        ],

        [

          Markup.button.callback(
            '🎰 Casino',
            'casino_menu'
          ),

          Markup.button.callback(
            '🎁 Lootbox',
            'lootbox'
          )

        ],

        [

          Markup.button.callback(
            '🛒 Shop',
            'shop_menu'
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

    MAIN_IMAGE,

    {

      caption:
`
╔══════════════════╗
        HACKWORLD
╚══════════════════╝

📜 RÈGLEMENT PRINCIPAL
━━━━━━━━━━━━━━━━━━

1️⃣ Respect obligatoire.

2️⃣ Aucun spam/flood.

3️⃣ Aucun contenu illégal.

4️⃣ Respect du staff.

5️⃣ Toute violation = bannissement.

━━━━━━━━━━━━━━━━━━

⚠️ En cliquant sur ACCEPTER,
vous acceptez le règlement.
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

module.exports = {

  startHandler,

  showMainMenu

}