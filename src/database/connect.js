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

    console.log(
      'Mongo connecté'
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