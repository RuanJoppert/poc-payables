module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transactions', 'order_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Transactions', 'order_id')
  },
}

