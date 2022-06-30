const tableName = 'ChargebackOperations'
const columnName = 'ratio'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    columnName,
    {
      type: Sequelize.FLOAT,
      allowNull: true,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
