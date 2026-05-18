const logger =
require(
  '../utils/logger'
)

const launchBot =
async (bot) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | STOP OLD POLLING
    |--------------------------------------------------------------------------
    */

    await bot.telegram
    .deleteWebhook({

      drop_pending_updates:
      true

    })

    /*
    |--------------------------------------------------------------------------
    | LAUNCH
    |--------------------------------------------------------------------------
    */

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