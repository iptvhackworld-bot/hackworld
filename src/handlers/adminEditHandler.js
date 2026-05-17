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
    getContent()

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
  | FORMAT
  |--------------------------------------------------------------------------
  */

  let message =
`
📦 LISTE DES CONTENUS

━━━━━━━━━━━━━━━━━━

`

  contents.forEach(

    (content, index) => {

      message +=
`
${index + 1}. ${content.text}

👤 ${content.author}

`
    }

  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(message)

}

/*
|--------------------------------------------------------------------------
| DELETE CONTENT
|--------------------------------------------------------------------------
*/

const removeContent =
async (

  ctx,

  index

) => {

  const deleted =
    deleteContent(index)

  if (!deleted) {

    return replyError(

      ctx,

      'Contenu introuvable'

    )

  }

  return replySuccess(

    ctx,

    'Contenu supprimé'

  )

}

module.exports = {

  showContentList,

  removeContent

}