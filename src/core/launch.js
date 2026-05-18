const logger =
require(
  '../utils/logger'
)

let launched = false

const launchBot = async (
  bot
) => {

  if (launched) {

    return

  }

  launched = true

  await bot.launch()

  logger(
    '🚀 Bot lancé'
  )

}

module.exports =
launchBot