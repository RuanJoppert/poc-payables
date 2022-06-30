module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PaymentLinks', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('PaymentLinks', 'expires_at')
  },
}
