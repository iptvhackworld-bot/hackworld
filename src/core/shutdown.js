const registerShutdown =
(bot) => {

  process.once(
    'SIGINT',
    () => bot.stop('SIGINT')
  )

  process.once(
    'SIGTERM',
    () => bot.stop('SIGTERM')
  )

}

module.exports =
  registerShutdown