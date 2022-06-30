const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface) {
    const filePath = 'models/balance/functions/get_balance_operations.sql'

    return readFile(`/code/postgres/migrations/sql/20180412183449-sync-sql-migration/${filePath}`)
      .then(buffer => queryInterface.sequelize.query(buffer.toString()))
  },

  down () {
    return Promise.resolve()
  },
}
