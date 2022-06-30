'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() => runSQL('ALTER TYPE balance_entry ADD ATTRIBUTE cache_changes json;'))
      .then(() => runSQL('ALTER TYPE cached_balance_entry ADD ATTRIBUTE id integer;'))
      .then(() => runSQL('ALTER TYPE cached_balance_entry ADD ATTRIBUTE last_id integer;'))
      .then(() => runSQL('ALTER TYPE cached_balance_entry ADD ATTRIBUTE previous_id integer;'))
      .then(() => loadSQLFile('models/balance/functions/cached_balance_table.sql'))
      .then(() => loadSQLFile('models/balance/functions/balance_calculate.sql'))

    function loadSQLFile (filePath) {
      return readFile(`/code/postgres/migrations/sql/20170420182105-sync-sql-migration/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }

    function runSQL (query) {
      return queryInterface.sequelize.query(query)
    }
  },

  down: function (queryInterface, Sequelize) {
    // TODO: Write a down function
    return Promise.resolve()
  }
}
