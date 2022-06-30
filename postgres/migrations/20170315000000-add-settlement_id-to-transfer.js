'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transfers', 'settlement_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true
    })
     .then(function() {
      return queryInterface.addIndex('Transfers', ["settlement_id"], {"fields":["settlement_id"]})
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transfers', 'settlement_id')
  }
}

