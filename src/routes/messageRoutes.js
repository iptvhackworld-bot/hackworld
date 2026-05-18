module.exports = (bot) => {

  /*
  |--------------------------------------------------------------------------
  | IMPORTS
  |--------------------------------------------------------------------------
  */

  const {

    handleBroadcastText,

    handleBroadcastMedia

  } = require(
    '../handlers/broadcastHandler'
  )

  const {

    handleTicket

  } = require(
    '../handlers/ticketHandler'
  )

  const {

    handleSearch

  } = require(
    '../handlers/searchHandler'
  )

  const {

    handleTitle,

    handleDescription,

    handleLink,

    handleMedia

  } = require(
    '../handlers/adminContentHandler'
  )

  const {

    handleEditTitle,

    handleEditDescription,

    handleEditLink,

    handleEditMedia

  } = require(
    '../handlers/adminEditHandler'
  )

  const {

    handleAddCategory

  } = require(
    '../handlers/categoryManagerHandler'
  )

  const {

    handleAddAdmin,

    handleRemoveAdmin,

    handleAddMod,

    handleRemoveMod

  } = require(
    '../handlers/staffManagerHandler'
  )
  
  const {

  handleSearchUser

} = require(
  '../handlers/manageUsersHandler'
)

  /*
  |--------------------------------------------------------------------------
  | PHOTO / VIDEO
  |--------------------------------------------------------------------------
  */

  bot.on(
    ['photo', 'video'],
    async (ctx) => {

      if (!ctx.session) {

        ctx.session = {}

      }

      /*
      |--------------------------------------------------------------------------
      | BROADCAST MEDIA
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'broadcast_waiting'
      ) {

        return handleBroadcastMedia(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | EDIT MEDIA
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'editing_media'
      ) {

        return handleEditMedia(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | ADD CONTENT MEDIA
      |--------------------------------------------------------------------------
      */

      await handleMedia(ctx)

    }
  )

  /*
  |--------------------------------------------------------------------------
  | TEXT
  |--------------------------------------------------------------------------
  */

  bot.on(
    'text',
    async (ctx) => {

      if (!ctx.session) {

        ctx.session = {}

      }
	  
	  bot.on(

  'text',

  handleSearchUser

)

      /*
      |--------------------------------------------------------------------------
      | SUPPORT
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'support_ticket'
      ) {

        return handleTicket(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | ADMIN STAFF
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'add_admin'
      ) {

        return handleAddAdmin(ctx)

      }

      if (
        ctx.session.step ===
        'remove_admin'
      ) {

        return handleRemoveAdmin(ctx)

      }

      if (
        ctx.session.step ===
        'add_mod'
      ) {

        return handleAddMod(ctx)

      }

      if (
        ctx.session.step ===
        'remove_mod'
      ) {

        return handleRemoveMod(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | CATEGORY
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'adding_category'
      ) {

        return handleAddCategory(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | BROADCAST
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'broadcast_waiting'
      ) {

        return handleBroadcastText(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | SEARCH
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'search_content'
      ) {

        return handleSearch(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | EDIT TITLE
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'editing_title'
      ) {

        return handleEditTitle(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | EDIT DESCRIPTION
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'editing_description'
      ) {

        return handleEditDescription(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | EDIT LINK
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'editing_link'
      ) {

        return handleEditLink(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | ADD TITLE
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'waiting_title'
      ) {

        return handleTitle(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | ADD DESCRIPTION
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'waiting_description'
      ) {

        return handleDescription(ctx)

      }

      /*
      |--------------------------------------------------------------------------
      | ADD LINK
      |--------------------------------------------------------------------------
      */

      if (
        ctx.session.step ===
        'waiting_link'
      ) {

        return handleLink(ctx)

      }

    }
  )

}