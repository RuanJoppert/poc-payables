const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20190430184607-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/payable/functions/anticipation_company_performance.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipation_recipient_performance.sql'))
  },

  down: () => Promise.resolve(),
}
