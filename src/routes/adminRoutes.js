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

      } catch (error) {

        console.log(
          'ADMIN PANEL ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN USERS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_users',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
?? Gestion utilisateurs

?? Fonction bient?t disponible.
`
        )

      } catch (error) {

        console.log(
          'ADMIN USERS ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN MODERATION
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_moderation',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
?? Mod¨¦ration

?? Fonction bient?t disponible.
`
        )

      } catch (error) {

        console.log(
          'MODERATION ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN LOGS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_logs',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
?? Logs syst¨¨me

?? Fonction bient?t disponible.
`
        )

      } catch (error) {

        console.log(
          'LOGS ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN SETTINGS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_settings',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
?? Param¨¨tres

?? Fonction bient?t disponible.
`
        )

      } catch (error) {

        console.log(
          'SETTINGS ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DASHBOARD
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_dashboard',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openDashboard(ctx)

      } catch (error) {

        console.log(
          'DASHBOARD ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN BROADCAST
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_broadcast',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
?? Broadcast

?? Fonction bient?t disponible.
`
        )

      } catch (error) {

        console.log(
          'BROADCAST ERROR:',
          error
        )

      }

    }

  )

}