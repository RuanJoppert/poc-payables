module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PaymentLinks', 'review_informations', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('PaymentLinks', 'review_informations')
  },
}

