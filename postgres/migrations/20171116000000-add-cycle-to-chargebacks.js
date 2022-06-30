const table = 'Chargebacks'
const column = 'cycle'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(table, column)
  },
}

