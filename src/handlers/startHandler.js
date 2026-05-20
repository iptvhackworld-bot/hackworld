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

  Bienvenue a tous les nouveau membres 


📜 RÈGLEMENT OFFICIEL — HACKWORLD 📜

❤️ Bienvenue à tous les nouveaux membres ❤️

Le groupe a été créé dans un esprit de partage, d’entraide et de respect mutuel.
Merci de lire attentivement le règlement ci-dessous afin d’éviter toute sanction.

━━━━━━━━━━━━━━━━━━
⛔ INTERDICTIONS ⛔
━━━━━━━━━━━━━━━━━━

Il est STRICTEMENT INTERDIT de :

1. Faire de la publicité sauvage 🚫
2. Publier ou parler de drogues 🚫
3. Publier ou vendre des armes 🚫
4. Partager du contenu pornographique 🚫
5. Tenir des propos racistes ou discriminatoires 🚫
6. Parler de religion ou créer des débats religieux 🚫
7. Insulter ou manquer de respect aux membres 🚫
8. Tenter une arnaque ou une usurpation d’identité 🚫
9. Contacter les membres en privé au nom du staff 🚫

━━━━━━━━━━━━━━━━━━
⚠️ SANCTIONS ⚠️
━━━━━━━━━━━━━━━━━━

Toute personne ne respectant pas le règlement sera sanctionnée :

• BAN IMMÉDIAT ET DÉFINITIF ⛔
• Aucun avertissement pour les cas graves 📛
• Les décisions des administrateurs sont finales ✅

━━━━━━━━━━━━━━━━━━
🔒 SÉCURITÉ & RAPPEL 🔒
━━━━━━━━━━━━━━━━━━

Pour votre sécurité :

✅ Nous ne vous contacterons jamais en message privé
✅ Aucun paiement sans système d’escrow
✅ Vérifiez toujours les @ officiels avant tout échange
✅ Toute annonce doit obligatoirement passer par l’escrow du groupe

Toute annonce postée sans respect des règles pourra entraîner un bannissement immédiat.

━━━━━━━━━━━━━━━━━━
📌 INFORMATIONS IMPORTANTES 📌
━━━━━━━━━━━━━━━━━━

• Restez polis et courtois avec tous les membres
• En cas de problème, contactez un administrateur
• Le staff se réserve le droit de modifier le règlement à tout moment

En restant dans le groupe, vous acceptez automatiquement ce règlement.

Merci à tous pour votre compréhension 🙏
— L’Équipe HackWorld


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