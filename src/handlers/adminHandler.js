const env = require(
  '../config/env'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
*/

const openAdminPanel =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (

    ctx.from.id.toString() !==
    env.ownerId.toString()

  ) {

    return ctx.answerCbQuery(
      '❌ Accès refusé',
      {
        show_alert: true
      }
    )

  }

  /*
  |--------------------------------------------------------------------------
  | PANEL
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👑 ADMIN PANEL

━━━━━━━━━━━━━━━━━━

⚙️ Gestion complète du bot
📊 Statistiques système
🛡 Contrôle administrateur

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '📦 Ajouter contenu',
          'admin_add_content'
        )

      ],

      [

        Markup.button.callback(
          '📝 Modifier contenu',
          'admin_edit_content'
        )

      ],

      [

        Markup.button.callback(
          '📢 Broadcast',
          'admin_broadcast'
        )

      ],

      [

        Markup.button.callback(
          '📊 Stats',
          'admin_stats'
        )

      ],

      [

        Markup.button.callback(
          '📜 Logs',
          'admin_logs'
        )

      ],

      [

        Markup.button.callback(
          '🔒 Sécurité',
          'admin_security'
        )

      ]

    ])

  )

}

module.exports = {

  openAdminPanel

}