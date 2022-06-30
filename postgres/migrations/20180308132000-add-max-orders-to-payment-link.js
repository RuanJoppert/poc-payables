module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PaymentLinks', 'max_orders', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('PaymentLinks', 'max_orders')
  },
}
