'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'allow_inter_recipient_transfer', {
      type: Sequelize.BOOLEAN
    })
      .then(runSQL('ALTER TABLE "Recipients" ALTER COLUMN allow_inter_recipient_transfer SET DEFAULT false'))

    function runSQL (query) {
      return queryInterface.sequelize.query(query)
    }
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Recipients', 'allow_inter_recipient_transfer')
  }
}
