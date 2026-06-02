const {

  setRole,

  banUser,

  unbanUser,

  muteUser,

  unmuteUser

} = require(
  '../services/staffService'
)

const {

  logStaffAction

} = require(
  '../utils/staffLogger'
)

const {

  createLog

} = require(
  '../services/logService'
)

const {

  logSecurity,

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| PROMOTE ADMIN
|--------------------------------------------------------------------------
*/

const promoteAdmin =
async (

  ctx,

  userId

) => {

  logStaffAction(

    'PROMOTE',

    ctx.from.id,

    userId

  )

  try {

    await setRole(

      userId,

      'admin'

    )

    logSecurity(
      `PROMOTE ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
✅ Utilisateur promu admin.
`
    )

  } catch (error) {

    logError(
      'PROMOTE_ADMIN',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| BAN
|--------------------------------------------------------------------------
*/

const banMember =
async (

  ctx,

  userId

) => {

  await createLog(

    'staff',

    ctx.from.id,

    'BAN',

    `Target: ${userId}`

  )

  logStaffAction(

    'BAN',

    ctx.from.id,

    userId

  )

  try {

    await banUser(userId)

    logSecurity(
      `BAN ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
🚫 Utilisateur banni.
`
    )

  } catch (error) {

    logError(
      'BAN_MEMBER',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| MUTE
|--------------------------------------------------------------------------
*/

const muteMember =
async (

  ctx,

  userId

) => {

  logStaffAction(

    'MUTE',

    ctx.from.id,

    userId

  )

  try {

    await muteUser(userId)

    logSecurity(
      `MUTE ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
🔇 Utilisateur mute.
`
    )

  } catch (error) {

    logError(
      'MUTE_MEMBER',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| UNBAN
|--------------------------------------------------------------------------
*/

const unbanMember =
async (

  ctx,

  userId

) => {

  try {

    await unbanUser(
      userId
    )

    logSecurity(
      `UNBAN ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
✅ Utilisateur débanni.
`
    )

  } catch (error) {

    logError(
      'UNBAN_MEMBER',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| UNMUTE
|--------------------------------------------------------------------------
*/

const unmuteMember =
async (

  ctx,

  userId

) => {

  try {

    await unmuteUser(
      userId
    )

    logSecurity(
      `UNMUTE ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
✅ Utilisateur unmute.
`
    )

  } catch (error) {

    logError(
      'UNMUTE_MEMBER',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| DEMOTE
|--------------------------------------------------------------------------
*/

const demoteAdmin =
async (

  ctx,

  userId

) => {

  try {

    await setRole(

      userId,

      'user'

    )

    logSecurity(
      `DEMOTE ${userId} BY ${ctx.from.id}`
    )

    await ctx.reply(
`
✅ Admin rétrogradé.
`
    )

  } catch (error) {

    logError(
      'DEMOTE_ADMIN',
      error
    )

  }

}

module.exports = {

  promoteAdmin,

  banMember,

  muteMember,

  unbanMember,

  unmuteMember,

  demoteAdmin

}