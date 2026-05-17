/*
|--------------------------------------------------------------------------
| VALIDATE TITLE
|--------------------------------------------------------------------------
*/

const validateTitle = (
  title
) => {

  if (!title) {

    return false

  }

  if (
    typeof title !==
    'string'
  ) {

    return false

  }

  return (
    title.trim().length >= 3
  )

}

/*
|--------------------------------------------------------------------------
| VALIDATE DESCRIPTION
|--------------------------------------------------------------------------
*/

const validateDescription =
(description) => {

  if (!description) {

    return false

  }

  if (
    typeof description !==
    'string'
  ) {

    return false

  }

  return (
    description.trim().length >= 5
  )

}

/*
|--------------------------------------------------------------------------
| VALIDATE LINK
|--------------------------------------------------------------------------
*/

const validateLink = (
  link
) => {

  if (!link) {

    return true

  }

  return (

    link.startsWith(
      'http://'
    )

    ||

    link.startsWith(
      'https://'
    )

  )

}

module.exports = {

  validateTitle,

  validateDescription,

  validateLink

}