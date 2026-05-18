const {

  addContent

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
| OPEN ADD CONTENT
|--------------------------------------------------------------------------
*/

const openAddContent =
async (ctx) => {

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'add_content'

  await ctx.reply(
`
📦 ENVOI DU CONTENU

━━━━━━━━━━━━━━━━━━

📝 Envoyez maintenant le contenu.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE ADD CONTENT
|--------------------------------------------------------------------------
*/

const handleAddContent =
async (ctx) => {

  if (

    ctx.session.step
    !==
    'add_content'

  ) {

    return

  }

  ctx.session.step =
    null

  const text =
    ctx.message.text

  if (!text) {

    return replyError(

      ctx,

      'Contenu invalide'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  await addContent({

    text,

    author:

      ctx.from.username ||

      ctx.from.first_name

  })

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  return replySuccess(

    ctx,

    'Contenu ajouté avec succès'

  )

}

module.exports = {

  openAddContent,

  handleAddContent

}