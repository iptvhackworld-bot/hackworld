const Quest =
require(
  '../models/Quest'
)

/*
|--------------------------------------------------------------------------
| CREATE QUEST
|--------------------------------------------------------------------------
*/

const createQuest =
async (data) => {

  return await Quest.create(data)

}

/*
|--------------------------------------------------------------------------
| GET QUESTS
|--------------------------------------------------------------------------
*/

const getUserQuests =
async (userId) => {

  return await Quest.find({

    userId

  })

}

/*
|--------------------------------------------------------------------------
| UPDATE QUEST
|--------------------------------------------------------------------------
*/

const updateQuestProgress =
async (

  userId,

  type,

  amount = 1

) => {

  const quests =
    await Quest.find({

      userId,

      type,

      completed: false

    })

  for (const quest of quests) {

    quest.progress +=
      amount

    if (

      quest.progress >=
      quest.goal

    ) {

      quest.completed =
        true
    }

    await quest.save()

  }

}

module.exports = {

  createQuest,

  getUserQuests,

  updateQuestProgress

}