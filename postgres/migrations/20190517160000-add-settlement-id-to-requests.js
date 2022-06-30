const tableName = 'GameOfTransfersRequests'
const columnName = 'settlement_id'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
