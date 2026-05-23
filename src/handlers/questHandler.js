const { Markup } =
require('telegraf')

const {

  createQuest,

  getUserQuests

} = require(
  '../services/questService'
)

const {

  addMoney

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openQuests =
async (ctx) => {

  let quests =
    await getUserQuests(

      ctx.from.id

    )

  /*
  |--------------------------------------------------------------------------
  | AUTO GENERATE
  |--------------------------------------------------------------------------
  */

  if (!quests.length) {

    await createQuest({

      userId:
      ctx.from.id,

      type:
      'messages',

      description:
      'Envoyer 25 messages',

      goal: 25,

      reward: 500

    })

    await createQuest({

      userId:
      ctx.from.id,

      type:
      'casino',

      description:
      'Jouer 5 parties casino',

      goal: 5,

      reward: 1000

    })

    quests =
      await getUserQuests(
        ctx.from.id
      )

  }

  let text =
`
⚔️ QUESTS

━━━━━━━━━━━━━━━━━━

`

  quests.forEach((quest) => {

    text +=
`
📜 ${quest.description}

📈 ${quest.progress}/${quest.goal}

💰 ${quest.reward}$

${quest.completed
? '✅ Terminée'
: '⏳ En cours'}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| CLAIM QUEST
|--------------------------------------------------------------------------
*/

const claimQuestReward =
async (

  ctx,

  questId

) => {

  const Quest =
  require(
    '../models/Quest'
  )

  const quest =
    await Quest.findById(
      questId
    )

  if (!quest) {

    return

  }

  if (!quest.completed) {

    return ctx.reply(
`
❌ Quête incomplète.
`
    )

  }

  if (quest.claimed) {

    return ctx.reply(
`
❌ Déjà récupérée.
`
    )

  }

  await addMoney(

    ctx.from.id,

    quest.reward,

    'Quest reward'

  )

  quest.claimed = true

  await quest.save()

  await ctx.reply(
`
🎁 Récompense récupérée

💰 ${quest.reward}$
`
  )

}

module.exports = {

  openQuests,

  claimQuestReward

}