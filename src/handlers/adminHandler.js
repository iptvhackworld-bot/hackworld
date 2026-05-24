const { Markup } =
require('telegraf')

const env =
require(
  '../config/env'
)

const {

  isOwner

} = require(
  '../utils/permissions'
)

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
*/

const openAdminPanel =
async (ctx) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | OWNER ONLY
    |--------------------------------------------------------------------------
    */

    const allowed =
  await isOwner(
    ctx.from.id
  )

if (!allowed)
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
            '👥 Users',
            'admin_users'
          ),

          Markup.button.callback(
            '🛡 Modération',
            'admin_moderation'
          )

        ],

        [

          Markup.button.callback(
            '🎫 Tickets',
            'support_panel'
          ),

          Markup.button.callback(
            '📊 Logs',
            'admin_logs'
          )

        ],

        [

          Markup.button.callback(
            '💰 Finance',
            'admin_finance'
          ),

          Markup.button.callback(
            '🛒 Shop',
            'admin_shop'
          )

        ],

        [

          Markup.button.callback(
            '🎰 Casino',
            'admin_casino'
          ),

          Markup.button.callback(
            '📦 Market',
            'market_analytics'
          )

        ],

        [

          Markup.button.callback(
            '🤖 Fraud Logs',
            'fraud_logs'
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

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openAdminPanel

}