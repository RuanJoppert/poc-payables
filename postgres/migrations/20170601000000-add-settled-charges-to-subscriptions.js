'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Subscriptions', 'settled_charges', {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Subscriptions', 'settled_charges')
  }
}
