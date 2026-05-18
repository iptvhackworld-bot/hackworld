const {

  createTicket,

  getTickets

} = require(
  '../services/ticketService'
)

/*
|--------------------------------------------------------------------------
| OPEN TICKET
|--------------------------------------------------------------------------
*/

const openTicketPanel =
async (ctx) => {

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'ticket_waiting'

  await ctx.reply(
`
🎫 SUPPORT

━━━━━━━━━━━━━━━━━━

📝 Envoyez votre problème.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE TICKET
|--------------------------------------------------------------------------
*/

const handleTicket =
async (ctx) => {

  if (

    ctx.session.step
    !==
    'ticket_waiting'

  ) {

    return

  }

  ctx.session.step =
    null

  await createTicket(

    ctx.from.id,

    ctx.message.text

  )

  await ctx.reply(
`
✅ Ticket envoyé.
`
  )

}

/*
|--------------------------------------------------------------------------
| ADMIN TICKETS
|--------------------------------------------------------------------------
*/

const showTickets =
async (ctx) => {

  const tickets =
    await getTickets()

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    tickets.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun ticket.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  let message =
`
🎫 TICKETS

━━━━━━━━━━━━━━━━━━

`

  tickets.forEach(

    (ticket) => {

      message +=
`
🆔 ${ticket._id}

👤 ${ticket.userId}

📩 ${ticket.message}

📌 ${ticket.status}

━━━━━━━━━━━━━━━━━━
`
    }

  )

  await ctx.reply(
    message
  )

}

module.exports = {

  openTicketPanel,

  handleTicket,

  showTickets

}