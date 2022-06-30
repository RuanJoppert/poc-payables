'use strict'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Customers', 'phones', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Customers', 'phones')
  }
}
