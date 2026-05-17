const {

  createBackup

} = require(
  '../handlers/backupHandler'
)

const startScheduler =
() => {

  /*
  |--------------------------------------------------------------------------
  | AUTO BACKUP
  |--------------------------------------------------------------------------
  */

  setInterval(() => {

    createBackup()

  }, 1000 * 60 * 30)

}

module.exports =
  startScheduler