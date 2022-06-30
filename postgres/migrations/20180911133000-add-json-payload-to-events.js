const tableName = 'Events'
const columnName = 'json_payload'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    columnName,
    {
      type: Sequelize.JSON,
      allowNull: true,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
