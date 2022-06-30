const table = 'Transactions'
const column = 'risk_level'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(table, column)
  },
}

