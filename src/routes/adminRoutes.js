module.exports = (bot) => {

  const {

    openAdminPanel

  } = require(
    '../handlers/adminHandler'
  )

  const {

    openDashboard

  } = require(
    '../handlers/dashboardHandler'
  )
  
  const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const {

  openSettings,

  toggleSetting

} = require(
  '../handlers/settingsHandler'
)

const {

  startBroadcast

} = require(
  '../handlers/broadcastHandler'
)

const {

  openAnalytics

} = require(
  '../handlers/analyticsHandler'
)

/*
  |--------------------------------------------------------------------------
  | ADMIN_ANALYTICS 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'admin_analytics',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await openAnalytics(
        ctx
      )

    }

    catch (error) {

      logError(
        'ADMIN_ANALYTICS',
        error
      )

    }

  }

)

/*
  |--------------------------------------------------------------------------
  | Marketplace ON/OFF
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'toggle_marketplace',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await toggleSetting(

        ctx,

        'marketplace'

      )

    }

    catch (error) {

      logError(
        'TOGGLE_MARKETPLACE',
        error
      )

    }

  }

)

/*
  |--------------------------------------------------------------------------
  | Support ON/OFF
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'toggle_support',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await toggleSetting(

        ctx,

        'support'

      )

    }

    catch (error) {

      logError(
        'TOGGLE_SUPPORT',
        error
      )

    }

  }

)

/*
  |--------------------------------------------------------------------------
  | Maintenance ON/OFF
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'toggle_maintenance',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await toggleSetting(

        ctx,

        'maintenance'

      )

    }

    catch (error) {

      logError(
        'TOGGLE_MAINTENANCE',
        error
      )

    }

  }

)


  
/*
  |--------------------------------------------------------------------------
  | Casino ON/OFF
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'toggle_casino',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await toggleSetting(

        ctx,

        'casino'

      )

    }

    catch (error) {

      logError(
        'TOGGLE_CASINO',
        error
      )

    }

  }

)





  /*
  |--------------------------------------------------------------------------
  | ADMIN PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()
		
		logInfo(
          `ADMIN_PANEL ${ctx.from.id}`
)

        await openAdminPanel(ctx)

      }

      catch (error) {

      logError(
        'ADMIN_PANEL',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | USERS
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_users',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()
	  
	  logInfo(
        `ADMIN_USERS ${ctx.from.id}`
)

      await ctx.reply(

`
👥 USER MANAGEMENT

━━━━━━━━━━━━━━━━━━

⚡ Gestion utilisateurs active

📌 Commandes disponibles :

/promote ID
/demote ID

/Ban ID
/unban ID

/mute ID
/unmute ID

━━━━━━━━━━━━━━━━━━
`,

        {

          reply_markup: {

            inline_keyboard: [

              [

                {

                  text:
                  '🚫 Ban',

                  callback_data:
                  'admin_ban_help'

                },

                {

                  text:
                  '✅ Unban',

                  callback_data:
                  'admin_unban_help'

                }

              ],

              [

                {

                  text:
                  '🔇 Mute',

                  callback_data:
                  'admin_mute_help'

                },

                {

                  text:
                  '🔊 Unmute',

                  callback_data:
                  'admin_unmute_help'

                }

              ],

              [
                {

                  text:
                  '👑 Promote',

                  callback_data:
                  'admin_promote_help'

                },

                {

                  text:
                  '⬇️ Demote',

                  callback_data:
                  'admin_demote_help'

                }
			   ],
				
			   [
				{

                   text:
                    '⬅️ Retour',

                  callback_data:
                   'admin_panel'

                },

                {

                   text:
                    '🏠 Menu',

                   callback_data:
                    'back_main_menu'

                }

              ]

            ]

          }

        }

      )

    }


    catch (error) {

      logError(
        'USERS',
        error
      )

    }

  }

)

/*
|--------------------------------------------------------------------------
| BAN HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_ban_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/ban USER_ID
`
    )

  }

)

/*
|--------------------------------------------------------------------------
| UNBAN HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_unban_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/unban USER_ID
`
    )

  }

)

/*
|--------------------------------------------------------------------------
| MUTE HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_mute_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/mute USER_ID
`
    )

  }

)

/*
|--------------------------------------------------------------------------
| UNMUTE HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_unmute_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/unmute USER_ID
`
    )

  }

)

/*
|--------------------------------------------------------------------------
| PROMOTE HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_promote_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/promote USER_ID
`
    )

  }

)

/*
|--------------------------------------------------------------------------
| DEMOTE HELP
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_demote_help',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👥 Utilisation :

/demote USER_ID
`
    )

  }

)

  /*
  |--------------------------------------------------------------------------
  | MODERATION
  |--------------------------------------------------------------------------
  */

bot.action(

  'admin_moderation',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `ADMIN_MODERATION ${ctx.from.id}`
      )

      await ctx.reply(

`
🛡 MODÉRATION

━━━━━━━━━━━━━━━━━━

⚡ Outils de modération

━━━━━━━━━━━━━━━━━━

📌 Commandes disponibles :

/warn ID raison

/mute ID

/unmute ID

/ban ID

/unban ID

/kick ID

━━━━━━━━━━━━━━━━━━
`,

        {

          reply_markup: {

            inline_keyboard: [

              [

                {

                  text:
                  '🚨 Warn',

                  callback_data:
                  'mod_warn'

                },

                {

                  text:
                  '🔇 Mute',

                  callback_data:
                  'mod_mute'

                }

              ],

              [

                {

                  text:
                  '🔊 Unmute',

                  callback_data:
                  'mod_unmute'

                },

                {

                  text:
                  '🚫 Ban',

                  callback_data:
                  'mod_ban'

                }

              ],

              [

                {

                  text:
                  '✅ Unban',

                  callback_data:
                  'mod_unban'

                },

                {

                  text:
                  '👢 Kick',

                  callback_data:
                  'mod_kick'

                }

              ],

              [

                {

                  text:
                  '📋 Logs',

                  callback_data:
                  'mod_logs'

                }

              ],

              [

                {

                  text:
                  '⬅️ Retour',

                  callback_data:
                  'admin_panel'

                },

                {

                  text:
                  '🏠 Menu',

                  callback_data:
                  'back_main_menu'

                }

              ]

            ]

          }

        }

      )

    }

    catch (error) {

      logError(
        'ADMIN_MODERATION',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | LOGS
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_logs',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()
	  
	  logInfo(
        `ADMIN_LOGS ${ctx.from.id}`
)

      const fs =
      require('fs')

      const path =
      require('path')

      const logFile =
      path.join(

        __dirname,

        '../logs/bot.log'

      )

      if (

        !fs.existsSync(logFile)

      ) {

        return ctx.reply(
`
❌ Aucun log trouvé.
`
        )

      }

      const content =
      fs.readFileSync(

        logFile,

        'utf8'

      )

      const lines =
      content

      .split('\n')

      .filter(Boolean)

      .slice(-20)

      .join('\n')

      await ctx.reply(

`
📊 LOGS HACKWORLD

━━━━━━━━━━━━━━━━━━

${lines || 'Aucun log'}

━━━━━━━━━━━━━━━━━━
`,

        {

          reply_markup: {

            inline_keyboard: [

              [

                {

                  text:
                  '🗑 Vider',

                  callback_data:
                  'clear_logs'

                }

              ],

              [

                {

                  text:
                  '⬅️ Retour',

                  callback_data:
                  'admin_panel'

                },

                {

                  text:
                  '🏠 Menu',

                  callback_data:
                  'back_main_menu'

                }

              ]

            ]

          }

        }

      )

    }

    catch (error) {

      logError(
        'LOGS',
        error
      )

    }

  }

)

/*
  |--------------------------------------------------------------------------
  | ADMIN SETTING
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'admin_settings',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      console.log(
        'ADMIN_SETTINGS_CLICK'
      )

      await openSettings(ctx)

    }

    catch (error) {

      logError(
        'ADMIN_SETTINGS',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | BROADCAST
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_broadcast',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await startBroadcast(
        ctx
      )

    }

    catch (error) {

      logError(
        'BROADCAST',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | FINANCE
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_finance',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()
	  
	  logInfo(
        `ADMIN_FINANCE ${ctx.from.id}`
)

      const User =
      require('../models/User')

      const users =
      await User.find()

      let totalMoney = 0

      for (const user of users) {

        totalMoney +=
        user.money || 0

      }

      const richest =
      users

      .sort(

        (a, b) =>

          (b.money || 0)

          -

          (a.money || 0)

      )

      .slice(0, 5)

      let richestText = ''

      richest.forEach(

        (user, index) => {

          richestText +=
`
${index + 1}. @${user.username || 'unknown'}

💰 ${user.money || 0}$

`

        }

      )

      await ctx.reply(

`
💰 HACKWORLD FINANCE

━━━━━━━━━━━━━━━━━━

👥 Users :
${users.length}

💵 Argent total :
${totalMoney}$

━━━━━━━━━━━━━━━━━━

🏆 TOP RICHEST

${richestText}

━━━━━━━━━━━━━━━━━━

📌 Commandes :

/addmoney ID amount

/removemoney ID amount

━━━━━━━━━━━━━━━━━━
`,

        {

          reply_markup: {

            inline_keyboard: [

              [

                {

                  text:
                  '💸 Transactions',

                  callback_data:
                  'finance_transactions'

                }

              ],

              [

                {

                  text:
                  '🏠 Menu',

                  callback_data:
                  'back_main_menu'

                }

              ]

            ]

          }

        }

      )

    }

    catch (error) {

      logError(
        'FINANCE',
        error
      )

    }

  }

)

/*
|--------------------------------------------------------------------------
| FINANCE TRANSACTIONS
|--------------------------------------------------------------------------
*/

bot.action(

  'finance_transactions',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await ctx.reply(
`
💸 Transactions system actif.
`
      )

    }

    catch (error) {

      logError(
        'FINANCE_TRANSACTIONS',
        error
      )

    }

  }

)

/*
|--------------------------------------------------------------------------
| MODERATION COMMAND 
|--------------------------------------------------------------------------
*/

bot.action(

  'mod_warn',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
🚨 Utilisation :

/warn USER_ID raison
`
    )

  }

)

bot.action(

  'mod_mute',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
🔇 Utilisation :

/mute USER_ID
`
    )

  }

)

bot.action(

  'mod_unmute',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
🔊 Utilisation :

/unmute USER_ID
`
    )

  }

)

bot.action(

  'mod_ban',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
🚫 Utilisation :

/ban USER_ID
`
    )

  }

)

bot.action(

  'mod_unban',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
✅ Utilisation :

/unban USER_ID
`
    )

  }

)

bot.action(

  'mod_kick',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
👢 Utilisation :

/kick USER_ID
`
    )

  }

)

bot.action(

  'mod_logs',

  async (ctx) => {

    await ctx.answerCbQuery()

    await ctx.reply(
`
📋 Logs de modération actifs.
`
    )

  }

)

/*
  |--------------------------------------------------------------------------
  | LOG HISTO
  |--------------------------------------------------------------------------
  */

bot.action(

  'clear_logs',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      const fs =
      require('fs')

      const path =
      require('path')

      const logFile =
      path.join(

        __dirname,

        '../logs/bot.log'

      )

      fs.writeFileSync(

        logFile,

        ''

      )

      await ctx.reply(
`
✅ Logs supprimés.
`
      )

    }

    catch (error) {

      logError(
        'LOGS_HISTORY',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CASINO
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_casino',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await ctx.reply(
`
🎰 Casino admin actif.
`
      )

    }

    catch (error) {

      logError(
        'CASINO',
        error
      )

    }

  }

)

}
