const mongoose =
require('mongoose')

const env =
require('../config/env')

const logger =
require('../utils/logger')

/*
|--------------------------------------------------------------------------
| CONNECT DATABASE
|--------------------------------------------------------------------------
*/

const connectDatabase =
async () => {

  try {

    await mongoose.connect(

      env.mongoUri

    )

    logger(
      '✅ MongoDB connecté'
    )

  }

  catch (error) {

    console.log(error)

    logger(
      '❌ MongoDB erreur'
    )

  }

}

module.exports =
connectDatabase