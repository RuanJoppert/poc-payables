'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('SplitRules', 'transaction_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('SplitRules', 'transaction_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
}
