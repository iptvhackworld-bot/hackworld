require('dotenv').config()

const { Telegraf } =
require('telegraf')

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

launchBot(bot)