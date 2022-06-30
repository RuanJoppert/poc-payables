'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transactions', 'billing_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(() =>
      queryInterface.addIndex('Transactions', ['billing_id'], {
        fields: ['billing_id']
      })
    )
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transactions', 'billing_id')
  }
}
