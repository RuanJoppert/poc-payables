const tableName = 'FidcFiles'
const field = 'key'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    field,
    {
      type: Sequelize.STRING,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, field),
}
