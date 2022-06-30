const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    function loadSQLFile (filePath) {
      return readFile(`/code/postgres/migrations/sql/20180314000000-update-anticipable-payables/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }

    return Promise.resolve()
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables.sql'))
  },

  down: function (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
