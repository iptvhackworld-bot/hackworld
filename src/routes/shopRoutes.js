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

  const {

    openShop,

    buyHandler

  } = require(
    '../handlers/shopHandler'
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

  /*
  |--------------------------------------------------------------------------
  | SHOP
  |--------------------------------------------------------------------------
  */

  bot.action(

    'shop_menu',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openShop(ctx)

    }

  )

  bot.action(

    /^buy_(.+)$/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await buyHandler(ctx)

    }

  )

}