const formatDate = (
  date
) => {

  return new Date(date)
    .toLocaleString(
      'fr-FR'
    )

}

module.exports =
  formatDate