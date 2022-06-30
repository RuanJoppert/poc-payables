const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface) {
    const filePath = 'models/refund/functions/refunds_with_associations.sql'

    return readFile(`/code/postgres/migrations/sql/20180419105921-sync-sql-migration/${filePath}`)
      .then(buffer => queryInterface.sequelize.query(buffer.toString()))
  },

  down () {
    return Promise.resolve()
  },
}
