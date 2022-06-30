const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

function loadSQLFile (queryInterface, fileName, model) {
  return readFile(`/code/postgres/migrations/sql/20180326160509-sync-sql-migration/models/${model}/functions/${fileName}`)
    .then(buffer => queryInterface.sequelize.query(buffer.toString()))
}

module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(loadSQLFile(queryInterface, 'setup_balances.sql', 'balance'))
      .then(loadSQLFile(queryInterface, 'balance_create_from_recipient.sql', 'recipient'))
  },

  down () {},
}
