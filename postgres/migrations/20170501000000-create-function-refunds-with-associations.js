'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(loadSQLFile('models/refund/functions/refunds_with_associations.sql'))
      .then(loadSQLFile('models/balance_operation/functions/associate_balance_operation.sql'))

    function loadSQLFile (filePath) {
      return readFile(`/code/postgres/migrations/sql/20170501000000-create-function-refunds-with-associations/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down: function (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
