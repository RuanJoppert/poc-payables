const tableName = 'BulkAnticipations'
const columnName = 'fraud_coverage_fee'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
    })
  },
  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
