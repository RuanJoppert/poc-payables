'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_Payables_type" ADD VALUE \'refund_reversal\'')
  },
  down: function (queryInterface, Sequelize) {}
}
