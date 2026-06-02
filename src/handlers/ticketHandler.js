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

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| OPEN PANEL
|--------------------------------------------------------------------------
*/

const openTicketPanel =
async (ctx) => {

  try {

    logInfo(
      `SUPPORT_PANEL ${ctx.from.id}`
    )

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
            '📩 Ouvrir Ticket',
            'create_ticket'
          )

        ],

        [

          Markup.button.callback(
            '📬 Mes Tickets',
            'my_tickets'
          )

        ],

        [

          Markup.button.callback(
            '🛠 Tickets Admin',
            'admin_tickets'
          )

        ],

        [

          Markup.button.callback(
            '🏠 Menu',
            'back_main_menu'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'SUPPORT_PANEL',
      error
    )

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

    logInfo(
      `TICKET_CREATED ${ctx.from.id}`
    )

    await ctx.reply(
`
✅ Ticket envoyé au support.
`
    )

    return true

  }

  catch (error) {

    logError(
      'HANDLE_TICKET_INPUT',
      error
    )

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

    logInfo(
      `ADMIN_TICKETS ${ctx.from.id}`
    )

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

  }

  catch (error) {

    logError(
      'ADMIN_TICKETS',
      error
    )

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

    logInfo(
      `TICKET_REPLY ${ctx.from.id} ${ticketId}`
    )

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

  }

  catch (error) {

    logError(
      'REPLY_TICKET',
      error
    )

  }

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

  logError(
    'REPLY_TICKET',
    error
  )

}

/*
|--------------------------------------------------------------------------
| USER TICKETS
|--------------------------------------------------------------------------
*/

const openUserTickets =
async (ctx) => {

  try {

    logInfo(
      `USER_TICKETS ${ctx.from.id}`
    )

    const tickets =
      await getTickets()

    const userTickets =
      tickets.filter(

        ticket =>

          ticket.userId ===
          ctx.from.id

      )

    if (

      !userTickets.length

    ) {

      return ctx.reply(
`
❌ Aucun ticket trouvé.
`
      )

    }

    for (const ticket of userTickets) {

      await ctx.reply(

`
🎫 MON TICKET

━━━━━━━━━━━━━━━━━━

🆔 ${ticket._id}

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

          ],

          [

            Markup.button.callback(
              '🏠 Menu',
              'back_main_menu'
            )

          ]

        ])

      )

    }

  }

  catch (error) {

    logError(
      'USER_TICKETS',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| CLOSE
|--------------------------------------------------------------------------
*/

const closeTicket =
async (

  ctx,

  id

) => {

  try {

    await closeTicketById(id)

    logInfo(
      `CLOSE_TICKET ${ctx.from.id} ${id}`
    )

    await ctx.reply(
`
✅ Ticket fermé.
`
    )

  }

  catch (error) {

    logError(
      'CLOSE_TICKET',
      error
    )

  }

}

module.exports = {

  openTicketPanel,

  handleTicketInput,

  handleAdminTicketInput,

  closeTicket,

  openAdminTickets,

  closeTicketAdmin,

  replyTicket,

  createTicket,

  openUserTickets

}