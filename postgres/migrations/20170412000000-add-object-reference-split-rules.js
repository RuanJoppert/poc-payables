'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SplitRules', 'object_type', {
      type: Sequelize.STRING,
      allowNull: true
    })
    .then(function () {
      return queryInterface.addColumn('SplitRules', 'object_id', {
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function() {
      return queryInterface.addIndex('SplitRules', ['object_type', 'object_id'], {'fields':['object_type', 'object_id']})
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SplitRules', 'object_type')
      .then(function () {
        return queryInterface.removeColumn('SplitRules', 'object_id')
      })
  }
}
