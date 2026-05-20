require('dotenv').config()

const { Telegraf } =
require('telegraf')

const session =
require(
  'telegraf/session'
)

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

/*
|--------------------------------------------------------------------------
| BOT
|--------------------------------------------------------------------------
*/

const bot =
new Telegraf(
  env.botToken
)

/*
|--------------------------------------------------------------------------
| SESSION
|--------------------------------------------------------------------------
*/

bot.use(

  session()

)

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

connectDatabase()

launchBot(bot)

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports =
bot