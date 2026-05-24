const {

  getTickets,

  closeTicketById

} = require(
  '../services/ticketService'
)

const { Markup } =
require('telegraf')

const {

  createTicket

} = require(
  '../services/ticketService'
)

const {

  addReply

} = require(
  '../services/ticketService'
)

/*
|--------------------------------------------------------------------------
| OPEN PANEL
|--------------------------------------------------------------------------
*/

const openTicketPanel =
async (ctx) => {

  try {

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

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| USER INPUT
|--------------------------------------------------------------------------
*/

const handleTicketInput =
async (ctx) => {

  try {

    if (

      !ctx.message ||

      !ctx.message.text

    ) {

      return false

    }

    await createTicket({

      userId:
      ctx.from.id,

      username:
      ctx.from.username ||

      'unknown',

      subject:
      'Support',

      message:
      ctx.message.text

    })

    await ctx.reply(
`
✅ Ticket envoyé au support.
`
    )

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| ADMIN TICKETS
|--------------------------------------------------------------------------
*/

const openAdminTickets =
async (ctx) => {

  try {

    const tickets =
      await getTickets()

    if (

      !tickets.length

    ) {

      return ctx.reply(
`
❌ Aucun ticket.
`
      )

    }

    for (const ticket of tickets) {

      await ctx.reply(

`
🎫 Ticket Support

━━━━━━━━━━━━━━━━━━

🆔 ${ticket._id}

👤 @${ticket.username}

📌 ${ticket.subject}

💬 ${ticket.message}

📊 Status :
${ticket.status}

━━━━━━━━━━━━━━━━━━
`,

        Markup.inlineKeyboard([

          [

            Markup.button.callback(
              '🔒 Fermer',
              `close_ticket_${ticket._id}`
            )

          ]

        ])

      )

    }

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| CLOSE TICKET DB
|--------------------------------------------------------------------------
*/

const closeTicketAdmin =
async (

  ctx,

  id

) => {

  try {

    await closeTicketById(id)

    await ctx.reply(
`
✅ Ticket fermé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| ADMIN INPUT
|--------------------------------------------------------------------------
*/

const handleAdminTicketInput =
async (ctx) => {

  try {

    return false

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| REPLY TICKET
|--------------------------------------------------------------------------
*/

const replyTicket =
async (

  ctx,

  ticketId,

  message

) => {

  try {

    const ticket =
      await addReply(

        ticketId,

        {

          authorId:
          ctx.from.id,

          authorUsername:
          ctx.from.username ||

          'admin',

          message

        }

      )

    if (!ticket) {

      return ctx.reply(
`
❌ Ticket introuvable.
`
      )

    }

    /*
    |--------------------------------------------------------------------------
    | NOTIFY USER
    |--------------------------------------------------------------------------
    */

    await ctx.telegram.sendMessage(

      ticket.userId,

`
📩 Nouvelle réponse support

💬 ${message}
`
    )

    await ctx.reply(
`
✅ Réponse envoyée.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| CLOSE
|--------------------------------------------------------------------------
*/

const closeTicket =
async (ctx) => {

  try {

    await ctx.reply(
`
✅ Ticket fermé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openTicketPanel,

  handleTicketInput,

  handleAdminTicketInput,

  closeTicket,
  
  openAdminTickets,

  closeTicketAdmin

}