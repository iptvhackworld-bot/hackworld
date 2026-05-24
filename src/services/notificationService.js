if (!global.notifications) {

  global.notifications = {}

}

/*
|--------------------------------------------------------------------------
| ENABLE NOTIFICATIONS
|--------------------------------------------------------------------------
*/

const enableNotifications =
(userId) => {

  global.notifications[
    userId
  ] = true

}

/*
|--------------------------------------------------------------------------
| DISABLE NOTIFICATIONS
|--------------------------------------------------------------------------
*/

const disableNotifications =
(userId) => {

  delete global.notifications[
    userId
  ]

}

/*
|--------------------------------------------------------------------------
| GET USERS
|--------------------------------------------------------------------------
*/

const getNotificationUsers =
() => {

  return Object.keys(

    global.notifications

  )

}

module.exports = {

  enableNotifications,

  disableNotifications,

  getNotificationUsers

}