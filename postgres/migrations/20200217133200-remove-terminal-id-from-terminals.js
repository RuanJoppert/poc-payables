const tableName = 'Terminals'
const columnName = 'terminal_id'

module.exports = {
  up (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING(8),
      allowNull: false,
    })
  },
}
