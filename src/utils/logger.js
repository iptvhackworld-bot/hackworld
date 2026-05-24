const fs =
require('fs')

const path =
require('path')

/*
|--------------------------------------------------------------------------
| LOG FILE
|--------------------------------------------------------------------------
*/

const logsDir =
path.join(

  __dirname,

  '../logs'

)

if (

  !fs.existsSync(logsDir)

) {

  fs.mkdirSync(logsDir)

}

const logFile =
path.join(

  logsDir,

  'bot.log'

)

/*
|--------------------------------------------------------------------------
| WRITE LOG
|--------------------------------------------------------------------------
*/

const writeLog =
(type, message) => {

  const time =
    new Date()

    .toISOString()

  const line =
`[${time}] [${type}] ${message}\n`

  console.log(line)

  fs.appendFileSync(

    logFile,

    line

  )

}

/*
|--------------------------------------------------------------------------
| INFO
|--------------------------------------------------------------------------
*/

const logInfo =
(message) => {

  writeLog(

    'INFO',

    message

  )

}

/*
|--------------------------------------------------------------------------
| ERROR
|--------------------------------------------------------------------------
*/

const logError =
(message) => {

  writeLog(

    'ERROR',

    message

  )

}

/*
|--------------------------------------------------------------------------
| SECURITY
|--------------------------------------------------------------------------
*/

const logSecurity =
(message) => {

  writeLog(

    'SECURITY',

    message

  )

}

/*
|--------------------------------------------------------------------------
| ECONOMY
|--------------------------------------------------------------------------
*/

const logEconomy =
(message) => {

  writeLog(

    'ECONOMY',

    message

  )

}

module.exports = {

  logInfo,

  logError,

  logSecurity,

  logEconomy

}