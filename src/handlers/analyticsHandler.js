const os = require('os')

const {

  userService

} = require('../data/userData')

const {

  contentService

} = require('../data/contentData')

const {

  loadLogs

} = require('../data/logData')

/*
|--------------------------------------------------------------------------
| START TIME
|--------------------------------------------------------------------------
*/

const startTime = Date.now()

/*
|--------------------------------------------------------------------------
| FORMAT UPTIME
|--------------------------------------------------------------------------
*/

const formatUptime = (
  seconds
) => {

  const hours =
    Math.floor(
      seconds / 3600
    )

  const minutes =
    Math.floor(
      (seconds % 3600) / 60
    )

  const secs =
    Math.floor(
      seconds % 60
    )

  return `${hours}h ${minutes}m ${secs}s`
}

/*
|--------------------------------------------------------------------------
| SHOW ANALYTICS
|--------------------------------------------------------------------------
*/

const showAnalytics =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | LOAD DATA
  |--------------------------------------------------------------------------
  */

  const users =
    userService()

  const contents =
    contentService()

  const logs =
    loadLogs()

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const uptime =
    process.uptime()

  const ramUsage =
    (
      process.memoryUsage()
        .heapUsed /
      1024 /
      1024
    ).toFixed(2)

  const cpuLoad =
    os.loadavg()[0]
      .toFixed(2)

  const totalUsers =
    users.length

  const totalContents =
    contents.length

  const totalLogs =
    logs.length

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
📡 HACKWORLD MONITOR

━━━━━━━━━━━━━━━━━━

🟢 STATUS :
ONLINE

⏱ UPTIME :
${formatUptime(uptime)}

💾 RAM :
${ramUsage} MB

⚡ CPU LOAD :
${cpuLoad}

👥 USERS :
${totalUsers}

📂 CONTENTS :
${totalContents}

📜 LOGS :
${totalLogs}

🖥 PLATFORM :
${os.platform()}

━━━━━━━━━━━━━━━━━━

🚀 Système stable
`
  )
}

module.exports = {

  showAnalytics

}