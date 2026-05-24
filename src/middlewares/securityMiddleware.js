if (!global.securityCooldowns) {

  global.securityCooldowns = {}

}

/*
|--------------------------------------------------------------------------
| COOLDOWN
|--------------------------------------------------------------------------
*/

const checkCooldown =
(

  userId,

  action,

  seconds

) => {

  const key =
    `${userId}_${action}`

  const now =
    Date.now()

  if (

    global.securityCooldowns[key]

    &&

    now <

    global.securityCooldowns[key]

  ) {

    return false

  }

  global.securityCooldowns[key] =

    now +

    seconds * 1000

  return true

}

module.exports = {

  checkCooldown

}