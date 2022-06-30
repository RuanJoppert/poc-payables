'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'mdrs', {
      type: Sequelize.JSON
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Recipients', 'mdrs')
  }
}
