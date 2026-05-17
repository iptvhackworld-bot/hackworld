const fs = require('fs')

const path = require('path')

/*
|--------------------------------------------------------------------------
| FILES
|--------------------------------------------------------------------------
*/

const filesToBackup = [

  'users.json',

  'content.json',

  'categories.json',

  'staff.json',

  'logs.json'

]

/*
|--------------------------------------------------------------------------
| PATHS
|--------------------------------------------------------------------------
*/

const dataPath = path.join(
  __dirname,
  '../data'
)

const backupPath = path.join(
  __dirname,
  '../backups'
)

/*
|--------------------------------------------------------------------------
| CREATE FOLDER
|--------------------------------------------------------------------------
*/

if (
  !fs.existsSync(backupPath)
) {

  fs.mkdirSync(backupPath)

}

/*
|--------------------------------------------------------------------------
| CREATE BACKUP
|--------------------------------------------------------------------------
*/

const createBackup = () => {

  const date =
    new Date()
      .toISOString()
      .replace(/:/g, '-')

  filesToBackup.forEach((file) => {

    const source =
      path.join(
        dataPath,
        file
      )

    if (
      fs.existsSync(source)
    ) {

      const destination =
        path.join(

          backupPath,

          `${date}-${file}`

        )

      fs.copyFileSync(
        source,
        destination
      )

    }

  })

  console.log(
    '✅ Backup créé'
  )
}

/*
|--------------------------------------------------------------------------
| EXPORT DATA
|--------------------------------------------------------------------------
*/

const exportData = async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | SEND FILES
  |--------------------------------------------------------------------------
  */

  for (const file of filesToBackup) {

    const filePath =
      path.join(
        dataPath,
        file
      )

    if (
      fs.existsSync(filePath)
    ) {

      await ctx.replyWithDocument({

        source: filePath

      })

    }

  }
}

/*
|--------------------------------------------------------------------------
| RESTORE LAST BACKUP
|--------------------------------------------------------------------------
*/

const restoreBackup =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | FILES
  |--------------------------------------------------------------------------
  */

  const backupFiles =
    fs.readdirSync(
      backupPath
    )

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    backupFiles.length === 0
  ) {

    return ctx.reply(
      '❌ Aucun backup.'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | RESTORE
  |--------------------------------------------------------------------------
  */

  filesToBackup.forEach((file) => {

    const matching =
      backupFiles
        .filter(f =>
          f.endsWith(file)
        )
        .sort()
        .reverse()[0]

    if (matching) {

      fs.copyFileSync(

        path.join(
          backupPath,
          matching
        ),

        path.join(
          dataPath,
          file
        )

      )

    }

  })

  await ctx.reply(
`
✅ Dernier backup restauré.
`
  )
}

module.exports = {

  createBackup,

  exportData,

  restoreBackup

}