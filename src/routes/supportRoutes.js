module.exports = (bot) => {

  const {

    openTicketPanel,

    createTicket,

    openUserTickets,

    closeTicket,

    openAdminTickets,

    replyTicket

  } = require(
    '../handlers/ticketHandler'
  )
  
  const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

  /*
  |--------------------------------------------------------------------------
  | SUPPORT PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

  'support_panel',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `SUPPORT_PANEL ${ctx.from.id}`
      )

      await openTicketPanel(ctx)

    }

    catch (error) {

      logError(
        'SUPPORT_PANEL',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CREATE TICKET
  |--------------------------------------------------------------------------
  */

  bot.action(

  'create_ticket',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `CREATE_TICKET ${ctx.from.id}`
      )

      await createTicket({

        userId:
        ctx.from.id,

        username:
        ctx.from.username ||

        'unknown',

        subject:
        'Support',

        message:
        'Ticket ouvert depuis le panel'

      })

      await ctx.reply(
`
✅ Ticket créé avec succès.
`
      )

    }

    catch (error) {

      logError(
        'CREATE_TICKET',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | USER TICKETS
  |--------------------------------------------------------------------------
  */

  bot.action(

  'my_tickets',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `MY_TICKETS ${ctx.from.id}`
      )

      await openUserTickets(ctx)

    }

    catch (error) {

      logError(
        'MY_TICKETS',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CLOSE TICKET
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^close_ticket_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      const id =
        ctx.match[1]

      logInfo(
        `CLOSE_TICKET ${ctx.from.id} ${id}`
      )

      await closeTicket(

        ctx,

        id

      )

    }

    catch (error) {

      logError(
        'CLOSE_TICKET',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | ADMIN TICKETS
  |--------------------------------------------------------------------------
  */

  bot.action(

  'admin_tickets',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `ADMIN_TICKETS ${ctx.from.id}`
      )

      await openAdminTickets(ctx)

    }

    catch (error) {

      logError(
        'ADMIN_TICKETS',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | REPLY
  |--------------------------------------------------------------------------
  */

  bot.command(

    'reply',

    async (ctx) => {

      try {

        const args =
          ctx.message.text.split(' ')

        const ticketId =
          args[1]

        const message =
          args.slice(2).join(' ')

        if (

          !ticketId ||

          !message

        ) {

          return ctx.reply(
`
❌ Utilisation :

/reply TICKET_ID message
`
          )

        }

        await replyTicket(

          ctx,

          ticketId,

          message

        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

}