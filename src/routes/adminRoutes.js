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

        await openAdminPanel(ctx)

      }

      catch (error) {

        console.log(error)

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

              ]

            ]

          }

        }

      )

    }

    catch (error) {

      console.log(error)

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

        await ctx.reply(
`
👥 Mod�ration active.
`
        )

      }

      catch (error) {

        console.log(error)

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

        await openDashboard(ctx)

      }

      catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SETTINGS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_settings',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
 Param�tres admin actifs.
`
        )

      }

      catch (error) {

        console.log(error)

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

        await ctx.reply(
`
 Broadcast actif.
`
        )

      }

      catch (error) {

        console.log(error)

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

      console.log(error)

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

      console.log(error)

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
 Casino admin actif.
`
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

}