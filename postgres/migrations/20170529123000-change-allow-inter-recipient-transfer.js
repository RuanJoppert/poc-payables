'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Recipients', 'allow_inter_recipient_transfer', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Recipients', 'allow_inter_recipient_transfer', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  }
}
