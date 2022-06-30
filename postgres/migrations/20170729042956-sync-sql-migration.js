const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(loadSQLFile(queryInterface, 'cached_balance_table.sql', 'balance'))
      .then(loadSQLFile(queryInterface, 'setup_balances.sql', 'balance'))
      .then(loadSQLFile(queryInterface, 'balance_create_from_recipient.sql', 'recipient'))
  },

  down (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}

function loadSQLFile (queryInterface, fileName, model) {
  return readFile(`/code/postgres/migrations/sql/20170729042956-sync-sql-migration/models/${model}/functions/${fileName}`)
    .then((buffer) => {
      return queryInterface.sequelize.query(buffer.toString())
    })
}
