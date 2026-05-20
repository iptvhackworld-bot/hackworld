const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| MODERATION PANEL
|--------------------------------------------------------------------------
*/

const openModerationPanel =
async (ctx) => {

  await ctx.reply(

`
🛡 MODERATION PANEL

━━━━━━━━━━━━━━━━━━

Gestion de la modération

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '⚠️ Avertir',
          'warn_user'
        ),

        Markup.button.callback(
          '✅ Remove Warn',
          'removewarn_user'
        )

      ],

      [

        Markup.button.callback(
          '🔇 Mute User',
          'mute_user'
        ),

        Markup.button.callback(
          '🔊 Unmute User',
          'unmute_user'
        )

      ],

      [

        Markup.button.callback(
          '⛔ Blacklist',
          'blacklist_user'
        )

      ],

      [

        Markup.button.callback(
          '📜 User Logs',
          'user_logs'
        )

      ],

      [

        Markup.button.callback(
          '🛡 AntiSpam',
          'antispam_panel'
        )

      ],

      [

        Markup.button.callback(
          '⬅️ Retour',
          'admin_panel'
        )

      ]

    ])

  )

}

module.exports = {

  openModerationPanel

}