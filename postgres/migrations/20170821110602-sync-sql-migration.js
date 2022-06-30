const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(query('DROP FUNCTION IF EXISTS anticipable_from_payable("Payables", integer, integer, timestamp with time zone);'))
      .then(loadSQLFile('anticipable_from_payable.sql', 'payable'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }

    function loadSQLFile (fileName, model) {
      return readFile(`/code/postgres/migrations/sql/20170821110602-sync-sql-migration/models/${model}/functions/${fileName}`)
        .then((buffer) => {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
