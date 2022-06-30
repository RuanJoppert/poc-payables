const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface) {
    const filePath = 'models/payable/functions/anticipable_payables.sql'

    return readFile(`/code/postgres/migrations/sql/20180621150525-sync-sql-migration/${filePath}`)
      .then(buffer => queryInterface.sequelize.query(buffer.toString()))
  },

  down () {
    return Promise.resolve()
  },
}

