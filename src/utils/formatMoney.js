const formatMoney = (
  amount
) => {

  return Number(amount)
    .toLocaleString(
      'fr-FR'
    )

}

module.exports =
  formatMoney