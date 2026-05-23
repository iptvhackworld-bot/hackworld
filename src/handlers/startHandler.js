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

🛡 Bienvenue sur notre bot 

🔒 SÉCURITÉ & RAPPEL 🔒

Pour votre sécurité :

✅ Nous ne vous contacterons jamais en message privé
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
		  
		  Markup.button.callback(
            '🏆 Leaderboards',
            'leaderboards'
          )
		  
		  Markup.button.callback(
            '🎰 Roulette',
            'roulette_panel'
          )
		  
		  Markup.button.callback(
            '🃏 Blackjack',
            'blackjack_panel'
          )
		  
		  Markup.button.callback(
            '💣 Mines',
            'mines_panel'
          )
		  
		  Markup.button.callback(
            '📈 Crash',
            'crash_panel'
          )
		  
		  Markup.button.callback(
            '🏆 Jackpot',
            'jackpot_panel'
          )
		  
		  Markup.button.callback(
            '🎁 Daily',
            'daily_reward'
          )
		  
		  Markup.button.callback(
            '🎡 Spin',
            'spin_wheel'
          )
		  
		  Markup.button.callback(
            '🎟 Lootboxes',
            'lootboxes_panel'
          )
        ],

        [

          Markup.button.callback(
            '🛒 Shop',
            'shop_menu'
          ),
		  
		  Markup.button.callback(
            '👑 Seller',
            'seller_dashboard'
          ),
		  
		  Markup.button.callback(
            '👑 Premium',
            'premium_panel'
          )
		  
		  Markup.button.callback(
            '💳 Crypto',
            'crypto_panel'
          )
		  
		  Markup.button.callback(
            '🐉 Pets',
            'pets_panel'
          )
		  
		  Markup.button.callback(
            '⚔️ Quests',
            'quests_panel'
          )
		  
		  Markup.button.callback(
            '👤 Profile',
            'profile_panel'
          )
		  
		  Markup.button.callback(
            '🎲 Dice',
            'dice_panel'
          ),

          Markup.button.callback(
           '👑 Prestige',
           'prestige_account'
          )

        ],

        [

          Markup.button.callback(
            '⚙️ Admin',
            'admin_panel'
          ),
		  
		  Markup.button.callback(
            '🏦 Wallet',
            'wallet_panel'
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

    }

  )

  /*
  |--------------------------------------------------------------------------
  | RULES
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

`
📜 RÈGLEMENT OFFICIEL — HACKWORLD 📜

❤️ Bienvenue à tous les nouveaux membres ❤️

Le groupe a été créé dans un esprit de partage, d’entraide et de respect mutuel.
Merci de lire attentivement le règlement ci-dessous afin d’éviter toute sanction.

━━━━━━━━━━━━━━━━━━
⛔ INTERDICTIONS ⛔
━━━━━━━━━━━━━━━━━━

1. Publicité sauvage 🚫
2. Drogues 🚫
3. Armes 🚫
4. Pornographie 🚫
5. Racisme / discrimination 🚫
6. Religion / débats religieux 🚫
7. Insultes / irrespect 🚫
8. Arnaques / usurpation 🚫
9. Faux staff / MP frauduleux 🚫

━━━━━━━━━━━━━━━━━━
⚠️ SANCTIONS ⚠️
━━━━━━━━━━━━━━━━━━

• BAN IMMÉDIAT ⛔
• Aucun avertissement pour cas graves 📛
• Décisions staff finales ✅

━━━━━━━━━━━━━━━━━━
🔒 SÉCURITÉ 🔒
━━━━━━━━━━━━━━━━━━

✅ Aucun MP du staff
✅ Vérifiez toujours les @ officiels
✅ Escrow obligatoire

━━━━━━━━━━━━━━━━━━
📌 IMPORTANT 📌
━━━━━━━━━━━━━━━━━━

• Respect obligatoire
• Contactez un admin si besoin
• Le règlement peut être modifié

⚠️ En cliquant sur ACCEPTER,
vous acceptez automatiquement ce règlement.

— L’Équipe HackWorld
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