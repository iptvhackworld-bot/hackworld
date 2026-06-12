const {

  addXp

} = require(
  '../services/levelService'
)

const {

  addXP

} = require(
  '../utils/xpSystem'
)

/*
|--------------------------------------------------------------------------
| XP MIDDLEWARE
|--------------------------------------------------------------------------
*/

module.exports =
async (

  ctx,

  next

) => {

  if (

    ctx.message &&

    ctx.message.text

  ) {

    if (!global.xpCooldowns) {

  global.xpCooldowns = {}

}

const last =

  global.xpCooldowns[
    ctx.from.id
  ]

if (

  !last ||

  Date.now() - last > 30000

) {

  await addXp(

    ctx.from.id,

    5

  )

  global.xpCooldowns[
    ctx.from.id
  ] = Date.now()

}

  }

  return next()

}