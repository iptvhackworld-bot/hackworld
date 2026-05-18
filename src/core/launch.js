const logger =
require(
  '../utils/logger'
)

const launchBot =
async (bot) => {

  try {

    await bot.launch({

      dropPendingUpdates:
      true

    })

    logger(
      '🚀 Bot lancé'
    )

  }

  catch (error) {

    console.log(error)

  }

}

module.exports =
launchBot