const {

  logError

} = require(
  '../services/loggerService'
)

const AppError =
require('../errors/AppError')

const registerErrors =
() => {

  /*
  |--------------------------------------------------------------------------
  | UNCAUGHT EXCEPTION
  |--------------------------------------------------------------------------
  */

  process.on(

    'uncaughtException',

    (err) => {

      logError(

        'Erreur non capturée',

        err

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | UNHANDLED REJECTION
  |--------------------------------------------------------------------------
  */

  process.on(

    'unhandledRejection',

    (err) => {

      logError(

        'Promise rejetée',

        err

      )

    }

  )

}

module.exports =
registerErrors