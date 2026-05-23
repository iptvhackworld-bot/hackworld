const FraudLog =
require(
  '../models/FraudLog'
)

/*
|--------------------------------------------------------------------------
| FRAUD LOGS
|--------------------------------------------------------------------------
*/

const openFraudLogs =
async (ctx) => {

  const logs =
    await FraudLog.find()

    .sort({

      createdAt: -1

    })

    .limit(20)

  if (!logs.length) {

    return ctx.reply(
`
❌ Aucun log.
`
    )

  }

  let text =
`
🤖 FRAUD LOGS

━━━━━━━━━━━━━━━━━━

`

  logs.forEach((log) => {

    text +=
`
👤 ${log.userId}

⚠️ ${log.reason}

📊 Risk :
${log.risk}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

module.exports = {

  openFraudLogs

}