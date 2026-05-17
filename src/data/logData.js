const fs = require('fs')

const path = require('path')

const filePath = path.join(
  __dirname,
  'logs.json'
)

if (!fs.existsSync(filePath)) {

  fs.writeFileSync(
    filePath,
    JSON.stringify([], null, 2)
  )

}

const loadLogs = () => {

  const data = fs.readFileSync(
    filePath,
    'utf8'
  )

  return JSON.parse(data)
}

const saveLogs = (logs) => {

  fs.writeFileSync(
    filePath,
    JSON.stringify(logs, null, 2)
  )
}

module.exports = {

  loadLogs,

  saveLogs

}