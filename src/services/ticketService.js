const Ticket =
require(
  '../models/Ticket'
)

/*
|--------------------------------------------------------------------------
| CREATE TICKET
|--------------------------------------------------------------------------
*/

const createTicket =
async (

  user,

  reason

) => {

  return await Ticket.create({

    userId:
    user.id,

    username:
    user.username || 'Unknown',

    reason

  })

}

/*
|--------------------------------------------------------------------------
| GET OPEN TICKETS
|--------------------------------------------------------------------------
*/

const getOpenTickets =
async () => {

  return await Ticket.find({

    status: 'open'

  })

  .sort({

    createdAt: -1

  })

}

/*
|--------------------------------------------------------------------------
| CLOSE TICKET
|--------------------------------------------------------------------------
*/

const closeTicket =
async (ticketId) => {

  return await Ticket.findByIdAndUpdate(

    ticketId,

    {

      status: 'closed'

    }

  )

}

/*
|--------------------------------------------------------------------------
| REPLY TICKET
|--------------------------------------------------------------------------
*/

const replyTicket =
async (

  ticketId,

  message

) => {

  return await Ticket.findByIdAndUpdate(

    ticketId,

    {

      adminReply: message

    }

  )

}

module.exports = {

  createTicket,

  getOpenTickets,

  closeTicket,

  replyTicket

}