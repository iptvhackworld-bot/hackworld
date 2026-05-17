const AppError =
require('./AppError')

class ValidationError
extends AppError {

  constructor(

    message =
    'Validation invalide'

  ) {

    super(
      message,
      400
    )

  }

}

module.exports =
ValidationError