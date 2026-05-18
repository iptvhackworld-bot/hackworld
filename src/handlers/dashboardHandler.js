const os =
require('os')

const {

  getTotalUsers

} = require(
  '../services/statsService'
)

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

const openDashboard =
async (ctx) => {

  const users =
    await getTotalUsers()

  const uptime =
    process.uptime()

  const ram =
    (
      os.totalmem() /
      1024 /
      1024 /
      1024
    ).toFixed(2)

  await ctx.reply(
`
📊 LIVE DASHBOARD

━━━━━━━━━━━━━━━━━━

👥 Users :
${users}

🟢 Status :
ONLINE

⚡ Uptime :
${Math.floor(uptime)} sec

💾 RAM :
${ram} GB

🌐 Webhook :
ACTIVE

🗄 MongoDB :
CONNECTED

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  openDashboard

}