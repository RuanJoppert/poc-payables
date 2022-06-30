const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = async (filePath) => {
      const buffer = await readFile(`/code/postgres/migrations/sql/20201013161759-sync-sql-migration/${filePath}`)

      return queryInterface.sequelize.query(buffer.toString())
    }

    return loadSQLFile('models/payable/functions/anticipation_company_and_recipient_performance.sql')
  },

  down: () => Promise.resolve(),
}
