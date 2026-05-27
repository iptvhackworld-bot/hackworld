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
?? Gestion utilisateurs active.
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
?? Modération active.
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
?? Paramètres admin actifs.
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
?? Broadcast actif.
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

        await ctx.reply(
`
?? Finance active.
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
?? Casino admin actif.
`
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

}