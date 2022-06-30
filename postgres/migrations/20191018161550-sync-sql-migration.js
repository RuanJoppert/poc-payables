const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20191018161550-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/balance_histogram/functions/cached_balance_histogram.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_from_payable.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables.sql'))
      .then(() => loadSQLFile('models/payable/functions/problematic_anticipable_payables.sql'))
      .then(() => loadSQLFile('util/functions/time_to_date.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipatable_payables.sql'))
      .then(() => loadSQLFile('models/payable/functions/get_anticipatable_payables.sql'))
  },

  down: () => Promise.resolve(),
}
