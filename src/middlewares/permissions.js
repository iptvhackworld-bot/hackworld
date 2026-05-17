const env =
require('../config/env')

const {

  loadStaff

} = require(
  '../data/staffData'
)

/*
|--------------------------------------------------------------------------
| OWNER
|--------------------------------------------------------------------------
*/

const isOwner = (
  ctx
) => {

  return (
    ctx.from.id.toString() ===
    env.ownerId
  )

}

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

const isAdmin = (
  ctx
) => {

  if (isOwner(ctx)) {

    return true

  }

  const staff =
    loadStaff()

  return staff.admins.includes(
    ctx.from.id
  )

}

/*
|--------------------------------------------------------------------------
| MODERATOR
|--------------------------------------------------------------------------
*/

const isModerator = (
  ctx
) => {

  if (
    isOwner(ctx) ||
    isAdmin(ctx)
  ) {

    return true

  }

  const staff =
    loadStaff()

  return staff.mods.includes(
    ctx.from.id
  )

}

module.exports = {

  isOwner,

  isAdmin,

  isModerator

}