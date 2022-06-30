module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PaymentLinks', 'status', {
      type: Sequelize.ENUM,
      values: ['active', 'canceled'],
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('PaymentLinks', 'status')
  },
}

