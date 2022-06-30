const table = 'Transactions'
const column = 'local_time'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(table, column)
  },
}
