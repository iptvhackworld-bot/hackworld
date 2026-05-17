const eventBus =
require('./eventBus')

const {

  adminLog

} = require(
  '../services/loggerService'
)

/*
|--------------------------------------------------------------------------
| REGISTER EVENTS
|--------------------------------------------------------------------------
*/

const registerEvents = (
  bot
) => {

  /*
  |--------------------------------------------------------------------------
  | USER BANNED
  |--------------------------------------------------------------------------
  */

  eventBus.on(

    'user_banned',

    async (data) => {

      adminLog(

        bot.telegram,

        data.admin,

        'BAN USER',

        `User ID: ${data.userId}`

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CONTENT ADDED
  |--------------------------------------------------------------------------
  */

  eventBus.on(

    'content_added',

    async (data) => {

      adminLog(

        bot.telegram,

        data.admin,

        'ADD CONTENT',

        data.title

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | TICKET CREATED
  |--------------------------------------------------------------------------
  */

  eventBus.on(

    'ticket_created',

    async (data) => {

      adminLog(

        bot.telegram,

        data.username,

        'SUPPORT TICKET',

        data.message

      )

    }

  )

}

module.exports =
registerEvents