const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| OPEN SUPPORT
|--------------------------------------------------------------------------
*/

const openTicketPanel =
async (ctx) => {

  await ctx.reply(

`
🎫 SUPPORT HACKWORLD

━━━━━━━━━━━━━━━━━━

Expliquez votre problème
en envoyant un message.

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🔒 Fermer Ticket',
          'close_ticket'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| USER INPUT
|--------------------------------------------------------------------------
*/

const handleTicketInput =
async (ctx) => {

  return false

}

/*
|--------------------------------------------------------------------------
| ADMIN INPUT
|--------------------------------------------------------------------------
*/

const handleAdminTicketInput =
async (ctx) => {

  return false

}

/*
|--------------------------------------------------------------------------
| CLOSE TICKET
|--------------------------------------------------------------------------
*/

const closeTicket =
async (ctx) => {

  await ctx.reply(
`
✅ Ticket fermé.
`
  )

}

module.exports = {

  openTicketPanel,

  handleTicketInput,

  handleAdminTicketInput,

  closeTicket

}