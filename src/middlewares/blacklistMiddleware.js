const blacklist =
require(
  '../config/blacklist'
)

/*
|--------------------------------------------------------------------------
| CHECK BLACKLIST
|--------------------------------------------------------------------------
*/

const containsBlacklistedWord =
(text = '') => {

  const lower =
    text.toLowerCase()

  return blacklist.some(

    (word) =>

      lower.includes(
        word.toLowerCase()
      )

  )

}

module.exports = {

  containsBlacklistedWord

}