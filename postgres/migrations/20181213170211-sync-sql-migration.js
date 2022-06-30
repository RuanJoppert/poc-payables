const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20181213170210-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/payable/functions/anticipable_from_payable.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables_filtered.sql'))
      .then(() => loadSQLFile('models/payable/functions/get_anticipatable_payables.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables_limits.sql'))
  },

  down: () => Promise.resolve(),
}
