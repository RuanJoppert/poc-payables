const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20211027162219-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/balance_operation/functions/balance_operations_with_associations.sql'))
      .then(() => loadSQLFile('models/balance/functions/get_balance_operations.sql'))
  },

  down: () => Promise.resolve(),
}
