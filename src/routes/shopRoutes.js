module.exports = (bot) => {

  /*
  |--------------------------------------------------------------------------
  | IMPORTS
  |--------------------------------------------------------------------------
  */

  const {

    openInventory

  } = require(
    '../handlers/inventoryHandler'
  )

  const {

    openCasinoPanel

  } = require(
    '../handlers/casinoHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | INVENTORY
  |--------------------------------------------------------------------------
  */

  bot.action(

    'inventory',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openInventory(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CASINO
  |--------------------------------------------------------------------------
  */

  bot.action(

    'casino_menu',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openCasinoPanel(ctx)

    }

  )

}