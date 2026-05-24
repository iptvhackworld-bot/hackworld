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

    await ctx.reply(
`
✅ Utilisateur promu admin.
`
    )

  } catch (error) {

    console.log(error)

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

    await ctx.reply(
`
🚫 Utilisateur banni.
`
    )

  } catch (error) {

    console.log(error)

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

    await ctx.reply(
`
🔇 Utilisateur mute.
`
    )

  } catch (error) {

    console.log(error)

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

    await ctx.reply(
`
✅ Utilisateur débanni.
`
    )

  } catch (error) {

    console.log(error)

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

    await ctx.reply(
`
✅ Utilisateur unmute.
`
    )

  } catch (error) {

    console.log(error)

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

    await ctx.reply(
`
✅ Admin rétrogradé.
`
    )

  } catch (error) {

    console.log(error)

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