const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() => loadSQLFile('models/balance/functions/get_balance_operations.sql'))
      .then(() => loadSQLFile('models/balance/functions/cached_balance_table_by_status.sql'))
      .then(() => loadSQLFile('models/balance/functions/balance_calculate_by_statuses.sql'))

    function loadSQLFile (filePath) {
      return readFile(`/code/postgres/migrations/sql/20171004214945-sync-sql-migration/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down: function (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
