const path = require('path')

const {

  read,

  write

} = require(
  '../database/jsonDatabase'
)

/*
|--------------------------------------------------------------------------
| FILE PATH
|--------------------------------------------------------------------------
*/

const filePath = path.join(

  __dirname,

  'stats.json'

)

/*
|--------------------------------------------------------------------------
| LOAD STATS
|--------------------------------------------------------------------------
*/

const loadStats = () => {

  return read(filePath)

}

/*
|--------------------------------------------------------------------------
| SAVE STATS
|--------------------------------------------------------------------------
*/

const saveStats = (
  stats
) => {

  write(
    filePath,
    stats
  )

}

module.exports = {

  loadStats,

  saveStats

}