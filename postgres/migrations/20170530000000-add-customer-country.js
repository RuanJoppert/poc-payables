'use strict'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Customers', 'country', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Customers', 'country')
  }
}
