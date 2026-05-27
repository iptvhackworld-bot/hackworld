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

        await openTicketPanel(ctx)

      }

      catch (error) {

        console.log(error)

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

      console.log(error)

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

        await openUserTickets(ctx)

      }

      catch (error) {

        console.log(error)

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

        await closeTicket(

          ctx,

          id

        )

      }

      catch (error) {

        console.log(error)

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

        await openAdminTickets(ctx)

      }

      catch (error) {

        console.log(error)

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