module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Customers', 'phone_numbers', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Customers', 'phone_numbers')
  }
}
