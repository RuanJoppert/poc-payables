'use strict'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Customers', 'type', {
      type: Sequelize.ENUM,
      values: ['individual', 'corporation'],
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Customers', 'type')
  }
}
