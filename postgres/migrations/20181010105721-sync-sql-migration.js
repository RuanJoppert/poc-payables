const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)
function loadSQLFile (queryInterface, fileName, model) {
  return readFile(`/code/postgres/migrations/sql/20181010105721-sync-sql-migration/models/${model}/functions/${fileName}`)
    .then(buffer => queryInterface.sequelize.query(buffer.toString()))
}
module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(loadSQLFile(queryInterface, 'transfers_with_associations.sql', 'transfer'))
  },
  down () {},
}
