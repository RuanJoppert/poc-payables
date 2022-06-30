const tableName = 'Recipients'
const column = 'statement_descriptor'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    column,
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  ),
  down: queryInterface => queryInterface.removeColumn(tableName, column),
}
