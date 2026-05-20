const env =
require(
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

    ctx.from.id.toString()

    !==

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
👑 HACKWORLD ADMIN

━━━━━━━━━━━━━━━━━━

⚡ Administration avancée

🛡 Contrôle système

📊 Monitoring temps réel

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '📦 Content',
          'admin_content'
        ),

        Markup.button.callback(
          '👥 Users',
          'admin_users'
        )

      ],
	  
	  [
        Markup.button.callback(
           '🛡 Modération',
           'admin_moderation'
        )
      ],
	  
      [

        Markup.button.callback(
          '🎫 Tickets',
          'admin_tickets'
        ),

        Markup.button.callback(
          '💰 Economy',
          'admin_economy'
        )

      ],

      [

        Markup.button.callback(
          '🛒 Shop',
          'admin_shop'
        ),

        Markup.button.callback(
          '🎰 Casino',
          'admin_casino'
        )

      ],

      [

        Markup.button.callback(
          '🎁 Lootbox',
          'admin_lootbox'
        ),

        Markup.button.callback(
          '👮 Staff',
          'admin_staff'
        )

      ],

      [

        Markup.button.callback(
          '📊 Dashboard',
          'admin_dashboard'
        ),

        Markup.button.callback(
          '📜 Logs',
          'admin_logs'
        )

      ],

      [

        Markup.button.callback(
          '🔒 Security',
          'admin_security'
        ),

        Markup.button.callback(
          '⚙️ Settings',
          'admin_settings'
        )

      ],

      [

        Markup.button.callback(
          '📢 Broadcast',
          'admin_broadcast'
        )

      ]

    ])

  )

}

module.exports = {

  openAdminPanel

}