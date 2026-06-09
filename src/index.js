require('dotenv').config()

/*
|--------------------------------------------------------------------------
| TELEGRAF
|--------------------------------------------------------------------------
*/

const { Telegraf } =
require('telegraf')



/*
|--------------------------------------------------------------------------
| ENV
|--------------------------------------------------------------------------
*/

const env =
require('./config/env')

/*
|--------------------------------------------------------------------------
| CORE
|--------------------------------------------------------------------------
*/

const registerMiddlewares =
require('./core/middlewares')

const registerRoutes =
require('./core/routes')

const registerEvents =
require('./events/registerEvents')

const launchBot =
require('./core/launch')

const registerShutdown =
require('./core/shutdown')

const registerErrors =
require('./core/errorHandler')

const startScheduler =
require('./core/scheduler')

const connectDatabase =
require('./database/connect')

const antiSpamMiddleware =
require(
  './middlewares/antiSpamMiddleware'
)

const {

  logError

} = require(
  './utils/logger'
)

const autoModerationMiddleware =
require(
  './middlewares/autoModerationMiddleware'
)

const {

  sendBroadcast

} = require(
  './handlers/broadcastHandler'
)

const {

  restoreBackup

} = require(
  './handlers/restoreHandler'
)

const fs =
require('fs')

const path =
require('path')

const https =
require('https')

/*
|--------------------------------------------------------------------------
| BOT
|--------------------------------------------------------------------------
*/

const bot =
new Telegraf(

  env.botToken

)

const xpMiddleware =
require(
  './middlewares/xpMiddleware'
)

bot.use(
  antiSpamMiddleware
)

bot.use(
  autoModerationMiddleware
)

bot.use(
  xpMiddleware
)



/*
|--------------------------------------------------------------------------
| RESTORE LISTENER
|--------------------------------------------------------------------------
*/

bot.on(

  'document',

  async (ctx, next) => {

    if (

      global.restoreMode &&

      global.restoreAdmin ===
      ctx.from.id

    ) {

      try {

        global.restoreMode =
          false

        global.restoreAdmin =
          null

        await ctx.reply(
`
📥 Fichier reçu

⚠️ Téléchargement du backup...
`
        )

        const file =
          await ctx.telegram.getFile(

            ctx.message.document.file_id

          )

        const url =

          `https://api.telegram.org/file/bot${env.botToken}/${file.file_path}`

        const restoreDir =
          path.join(

            __dirname,

            '../restore'

          )

        if (

          !fs.existsSync(
            restoreDir
          )

        ) {

          fs.mkdirSync(
            restoreDir
          )

        }

        const filePath =
          path.join(

            restoreDir,

            'restore.json'

          )

        const stream =
          fs.createWriteStream(
            filePath
          )

        https.get(

          url,

          (response) => {

            response.pipe(
              stream
            )

            stream.on(

              'finish',

              async () => {

                stream.close()

                await restoreBackup(

                  ctx,

                  filePath

                )

              }

            )

          }

        )

      }

      catch (error) {

        console.log(error)

      }

    }

    return next()

  }

)

/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

//registerMiddlewares(bot)

/*
|--------------------------------------------------------------------------
| BROADCAST LISTENER
|--------------------------------------------------------------------------
*/

bot.on(

  'text',

  async (ctx, next) => {

    if (

      global.broadcastMode &&

      global.broadcastAdmin ===
      ctx.from.id

    ) {

      /*
      |--------------------------------------------------------------------------
      | CANCEL
      |--------------------------------------------------------------------------
      */

      if (

        ctx.message.text ===
        '/cancel'

      ) {

        global.broadcastMode =
        false

        global.broadcastAdmin =
        null

        return ctx.reply(
`
❌ Broadcast annulé.
`
        )

      }

      /*
      |--------------------------------------------------------------------------
      | SEND
      |--------------------------------------------------------------------------
      */

      global.broadcastMode =
      false

      global.broadcastAdmin =
      null

      return sendBroadcast(

        ctx,

        ctx.message.text

      )

    }

    return next()

  }

)

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

registerRoutes(bot)

/*
|--------------------------------------------------------------------------
| EVENTS
|--------------------------------------------------------------------------
*/

registerEvents(bot)

/*
|--------------------------------------------------------------------------
| CORE
|--------------------------------------------------------------------------
*/

startScheduler()

registerErrors()

registerShutdown(bot)

/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/

connectDatabase()

/*
|--------------------------------------------------------------------------
| LAUNCH
|--------------------------------------------------------------------------
*/

launchBot(bot)

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports =
bot