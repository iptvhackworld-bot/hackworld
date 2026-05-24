module.exports = (bot) => {

  const {

    openFilters

  } = require(
    '../handlers/filterHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | FILTERS
  |--------------------------------------------------------------------------
  */

  bot.command(

    'filters',

    async (ctx) => {

      try {

        await openFilters(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}