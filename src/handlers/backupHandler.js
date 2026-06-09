const fs =
require('fs')

const path =
require('path')

const User =
require(
  '../models/User'
)

const Ticket =
require(
  '../models/Ticket'
)

const MarketListing =
require(
  '../models/MarketListing'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const createBackup =
async (ctx) => {

  try {

    const users =
      await User.find()

    const tickets =
      await Ticket.find()

    const listings =
      await MarketListing.find()

    const backup = {

      createdAt:
        new Date(),

      users,

      tickets,

      listings

    }

    const backupDir =
      path.join(

        __dirname,

        '../backups'

      )

    if (

      !fs.existsSync(
        backupDir
      )

    ) {

      fs.mkdirSync(
        backupDir
      )

    }

    const fileName =

      `backup_${Date.now()}.json`

    const filePath =

      path.join(

        backupDir,

        fileName

      )

    fs.writeFileSync(

      filePath,

      JSON.stringify(

        backup,

        null,

        2

      )

    )

    logInfo(
      `BACKUP_CREATED ${fileName}`
    )

    await ctx.reply(
`
💾 Backup créé avec succès

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${users.length}

🎫 Tickets :
${tickets.length}

📦 Listings :
${listings.length}

📄 Fichier :

${fileName}

━━━━━━━━━━━━━━━━━━
`
)

await ctx.replyWithDocument({

  source:
    filePath

})

  }

  catch (error) {

    logError(
      'BACKUP',
      error
    )

  }

}

module.exports = {

  createBackup

}