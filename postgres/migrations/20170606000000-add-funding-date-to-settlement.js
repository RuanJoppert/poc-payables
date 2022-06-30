'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Settlements', 'funding_date', {
      type: Sequelize.DATE
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Settlements', 'funding_date')
  }
}
