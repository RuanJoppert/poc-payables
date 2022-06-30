const table = 'Payables'
const column = 'liquidation_arrangement_key'

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

