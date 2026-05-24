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

const securityMiddleware =
require(
  './middlewares/securityMiddleware'
)

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
  securityMiddleware
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
| SESSION
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

registerMiddlewares(bot)

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