const {

  loadStaff,

  saveStaff

} = require('../data/staffData')

/*
|--------------------------------------------------------------------------
| OWNER
|--------------------------------------------------------------------------
*/

const isOwner = (userId) => {

  if (
    userId.toString() ===
    env.ownerId
  ) {

    return true

  }

  const staff = loadStaff()

  return staff.owners.includes(
    userId
  )
}

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

const isAdmin = (userId) => {

  if (isOwner(userId)) {

    return true

  }

  const staff = loadStaff()

  return staff.admins.includes(
    userId
  )
}

/*
|--------------------------------------------------------------------------
| MOD
|--------------------------------------------------------------------------
*/

const isMod = (userId) => {

  if (isAdmin(userId)) {

    return true

  }

  const staff = loadStaff()

  return staff.mods.includes(
    userId
  )
}

/*
|--------------------------------------------------------------------------
| ADD ADMIN
|--------------------------------------------------------------------------
*/

const addAdmin = (userId) => {

  const staff = loadStaff()

  if (
    !staff.admins.includes(userId)
  ) {

    staff.admins.push(userId)

  }

  saveStaff(staff)
}

/*
|--------------------------------------------------------------------------
| REMOVE ADMIN
|--------------------------------------------------------------------------
*/

const removeAdmin = (userId) => {

  const staff = loadStaff()

  staff.admins =
    staff.admins.filter(
      id => id !== userId
    )

  saveStaff(staff)
}

/*
|--------------------------------------------------------------------------
| ADD MOD
|--------------------------------------------------------------------------
*/

const addMod = (userId) => {

  const staff = loadStaff()

  if (
    !staff.mods.includes(userId)
  ) {

    staff.mods.push(userId)

  }

  saveStaff(staff)
}

/*
|--------------------------------------------------------------------------
| REMOVE MOD
|--------------------------------------------------------------------------
*/

const removeMod = (userId) => {

  const staff = loadStaff()

  staff.mods =
    staff.mods.filter(
      id => id !== userId
    )

  saveStaff(staff)
}

module.exports = {

  isOwner,

  isAdmin,

  isMod,

  addAdmin,

  removeAdmin,

  addMod,

  removeMod

}