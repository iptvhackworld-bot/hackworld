const {

  logError

} = require(
  '../services/loggerService'
)

const asyncHandler =
(fn) => {

  return async (
    ctx,
    next
  ) => {

    try {

      return await fn(
        ctx,
        next
      )

    } catch (err) {

      /*
      |--------------------------------------------------------------------------
      | LOG
      |--------------------------------------------------------------------------
      */

      logError(
        'Erreur handler',
        err
      )

      /*
      |--------------------------------------------------------------------------
      | USER MESSAGE
      |--------------------------------------------------------------------------
      */

      return ctx.reply(
`
❌ Une erreur est survenue.
`
      )

    }

  }

}

module.exports =
asyncHandler