module.exports = (bot) => {

  const {

    openAdminPanel

  } = require(
    '../handlers/adminHandler'
  )

  const {

    showLogs

  } = require(
    '../handlers/logHandler'
  )

  const {

    showAnalytics

  } = require(
    '../handlers/analyticsHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(
    'admin_panel',
    openAdminPanel
  )

  /*
  |--------------------------------------------------------------------------
  | LOGS
  |--------------------------------------------------------------------------
  */

  bot.action(
    'admin_logs',
    showLogs
  )

  /*
  |--------------------------------------------------------------------------
  | ANALYTICS
  |--------------------------------------------------------------------------
  */

  bot.action(
    'analytics_panel',
    showAnalytics
  )

}