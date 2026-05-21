const { Markup } =
require('telegraf')

const Ticket =
require(
  '../models/Ticket'
)

const {

  createTicket,

  getOpenTickets,

  closeTicket,

  replyTicket

} = require(
  '../services/ticketService'
)

if (!global.ticketSessions) {

  global.ticketSessions = {}

}

/*
|--------------------------------------------------------------------------
| USER PANEL
|--------------------------------------------------------------------------
*/

const openSupportPanel =
async (ctx) => {

  global.ticketSessions[
    ctx.from.id
  ] = {

    action:
    'create_ticket'

  }

  await ctx.reply(
`
🎫 SUPPORT

Envoyez votre problème.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE USER TICKET
|--------------------------------------------------------------------------
*/

const handleTicketInput =
async (ctx) => {

  const session =

    global.ticketSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | CREATE TICKET
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'create_ticket'

  ) {

    const ticket =
      await createTicket(

        ctx.from,

        ctx.message.text

      )

    delete global.ticketSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Ticket créé.

🎫 ID :
${ticket._id}

📨 Support bientôt répondu.
`
    )

  }

  return false

}

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
*/

const openAdminTickets =
async (ctx) => {

  const tickets =
    await getOpenTickets()

  if (!tickets.length) {

    return ctx.reply(
`
📭 Aucun ticket ouvert.
`
    )

  }

  let text =
`
🎫 TICKETS OUVERTS

━━━━━━━━━━━━━━━━━━
`

  tickets.forEach((ticket) => {

    text +=
`
🆔 ${ticket._id}

👤 @${ticket.username}

📝 ${ticket.reason}

📅 ${new Date(
  ticket.createdAt
).toLocaleString()}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| CLOSE PANEL
|--------------------------------------------------------------------------
*/

const closeTicketPanel =
async (ctx) => {

  global.ticketSessions[
    ctx.from.id
  ] = {

    action:
    'close_ticket'

  }

  await ctx.reply(
`
🔒 Envoyez l'ID ticket.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE CLOSE
|--------------------------------------------------------------------------
*/

const handleAdminTicketInput =
async (ctx) => {

  const session =

    global.ticketSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | CLOSE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'close_ticket'

  ) {

    await closeTicket(
      ctx.message.text
    )

    delete global.ticketSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
🔒 Ticket fermé.
`
    )

  }

  return false

}

module.exports = {

  openSupportPanel,

  handleTicketInput,

  openAdminTickets,

  closeTicketPanel,

  handleAdminTicketInput

}