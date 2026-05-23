const { Markup } =
require('telegraf')

const {

  createPet,

  getUserPets,

  activatePet

} = require(
  '../services/petService'
)

/*
|--------------------------------------------------------------------------
| PET BOX
|--------------------------------------------------------------------------
*/

const petRewards = [

  {

    name: '🐶 Dog',

    rarity: 'common',

    bonusType: 'xp',

    bonusValue: 5

  },

  {

    name: '🐱 Cat',

    rarity: 'rare',

    bonusType: 'daily',

    bonusValue: 10

  },

  {

    name: '🐉 Dragon',

    rarity: 'legendary',

    bonusType: 'casino',

    bonusValue: 25

  },

  {

    name: '👑 Phoenix',

    rarity: 'mythic',

    bonusType: 'crypto',

    bonusValue: 50

  }

]

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openPets =
async (ctx) => {

  const pets =
    await getUserPets(

      ctx.from.id

    )

  let text =
`
🐉 PET SYSTEM

━━━━━━━━━━━━━━━━━━

`

  if (!pets.length) {

    text +=
`
❌ Aucun pet.
`
  }

  pets.forEach((pet) => {

    text +=
`
${pet.name}

⭐ ${pet.rarity}

📈 +${pet.bonusValue}%
${pet.bonusType}

${pet.active
? '✅ Actif'
: ''}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(

    text,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '🎁 Ouvrir Pet Box',
      'open_pet_box'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| OPEN PET BOX
|--------------------------------------------------------------------------
*/

const openPetBox =
async (ctx) => {

  const reward =

    petRewards[
      Math.floor(

        Math.random()

        *

        petRewards.length

      )
    ]

  await createPet({

    userId:
    ctx.from.id,

    name:
    reward.name,

    rarity:
    reward.rarity,

    bonusType:
    reward.bonusType,

    bonusValue:
    reward.bonusValue

  })

  await ctx.reply(
`
🎁 PET UNLOCKED

━━━━━━━━━━━━━━━━━━

${reward.name}

⭐ ${reward.rarity}

📈 +${reward.bonusValue}%
${reward.bonusType}

━━━━━━━━━━━━━━━━━━
`
  )

}

/*
|--------------------------------------------------------------------------
| ACTIVATE
|--------------------------------------------------------------------------
*/

const activatePetHandler =
async (

  ctx,

  petId

) => {

  await activatePet(

    ctx.from.id,

    petId

  )

  await ctx.reply(
`
✅ Pet activé.
`
  )

}

module.exports = {

  openPets,

  openPetBox,

  activatePetHandler

}