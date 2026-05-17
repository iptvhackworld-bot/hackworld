const logger =
require(
  '../utils/logger'
)

const launchBot = (
  bot
) => {

  bot.launch()

  logger(
    '🚀 Bot lancé'
  )

}

module.exports =
  launchBot