const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20210420134742-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/payable/functions/get_anticipatable_payables.sql'))
  },

  down: () => Promise.resolve(),
}
