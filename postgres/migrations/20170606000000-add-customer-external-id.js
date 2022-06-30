'use strict'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Customers', 'external_id', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Customers', 'external_id')
  }
}
