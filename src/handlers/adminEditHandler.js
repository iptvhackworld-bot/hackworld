const {

  getContent,

  deleteContent

} = require(
  '../services/contentService'
)

const {

  replySuccess,

  replyError

} = require(
  '../utils/responses'
)

/*
|--------------------------------------------------------------------------
| SHOW CONTENT LIST
|--------------------------------------------------------------------------
*/

const showContentList =
async (ctx) => {

  const contents =
    await getContent()

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    contents.length === 0
  ) {

    return replyError(

      ctx,

      'Aucun contenu disponible'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  let message =
`
📦 LISTE DES CONTENUS

━━━━━━━━━━━━━━━━━━

`

  contents.forEach(

    (
      content,
      index
    ) => {

      message +=
`
${index + 1}. ${content.text}

👤 ${content.author}

🆔 ${content._id}

━━━━━━━━━━━━━━━━━━

`
    }

  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
    message
  )

}

/*
|--------------------------------------------------------------------------
| DELETE CONTENT
|--------------------------------------------------------------------------
*/

const removeContent =
async (

  ctx,

  id

) => {

  const deleted =
    await deleteContent(id)

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!deleted) {

    return replyError(

      ctx,

      'Contenu introuvable'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  return replySuccess(

    ctx,

    'Contenu supprimé'

  )

}

module.exports = {

  showContentList,

  removeContent

}