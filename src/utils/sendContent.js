const { Markup } = require('telegraf')

const sendContent = async (ctx, item) => {

  /*
  |--------------------------------------------------------------------------
  | BUTTONS
  |--------------------------------------------------------------------------
  */

  const keyboard = [

    [
      Markup.button.callback(
        '⬅️ PREV',
        `prev_${item.category}_${item.id}`
      ),

      Markup.button.callback(
        '➡️ NEXT',
        `next_${item.category}_${item.id}`
      )
    ]

  ]

  /*
  |--------------------------------------------------------------------------
  | DOWNLOAD BUTTON
  |--------------------------------------------------------------------------
  */

  if (

    item.downloadLink &&

    (
      item.downloadLink.startsWith('http://') ||

      item.downloadLink.startsWith('https://')
    )

  ) {

    keyboard.push([

      Markup.button.url(
        '🔗 DOWNLOAD',
        item.downloadLink
      )

    ])

  }

  /*
  |--------------------------------------------------------------------------
  | MENU BUTTON
  |--------------------------------------------------------------------------
  */

  keyboard.push([

    Markup.button.callback(
      '🔙 MENU',
      'back_menu'
    )

  ])

  const buttons =
    Markup.inlineKeyboard(keyboard)

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  const message =
`
╔══════════════════╗
      HACKWORLD
╚══════════════════╝

📌 ${item.title}

━━━━━━━━━━━━━━━━━━

${item.description}
`

  /*
  |--------------------------------------------------------------------------
  | PHOTO
  |--------------------------------------------------------------------------
  */

  if (item.mediaType === 'photo') {

    /*
    |--------------------------------------------------------------------------
    | TELEGRAM FILE ID
    |--------------------------------------------------------------------------
    */

    if (
      typeof item.mediaUrl === 'string'
    ) {

      return ctx.replyWithPhoto(
        item.mediaUrl,
        {
          caption: message,
          ...buttons
        }
      )

    }

    /*
    |--------------------------------------------------------------------------
    | LOCAL FILE
    |--------------------------------------------------------------------------
    */

    return ctx.replyWithPhoto(
      {
        source: item.mediaUrl
      },
      {
        caption: message,
        ...buttons
      }
    )

  }

  /*
  |--------------------------------------------------------------------------
  | VIDEO
  |--------------------------------------------------------------------------
  */

  if (item.mediaType === 'video') {

    /*
    |--------------------------------------------------------------------------
    | TELEGRAM FILE ID
    |--------------------------------------------------------------------------
    */

    if (
      typeof item.mediaUrl === 'string'
    ) {

      return ctx.replyWithVideo(
        item.mediaUrl,
        {
          caption: message,
          ...buttons
        }
      )

    }

    /*
    |--------------------------------------------------------------------------
    | LOCAL FILE
    |--------------------------------------------------------------------------
    */

    return ctx.replyWithVideo(
      {
        source: item.mediaUrl
      },
      {
        caption: message,
        ...buttons
      }
    )

  }

  /*
  |--------------------------------------------------------------------------
  | TEXT ONLY
  |--------------------------------------------------------------------------
  */

  return ctx.reply(
    message,
    buttons
  )
}

module.exports = sendContent