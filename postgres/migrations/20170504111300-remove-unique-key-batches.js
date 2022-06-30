'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Batches" DROP CONSTRAINT IF EXISTS "Batches_payment_date_card_brand_key"
    `)
  },
  down: function (queryInterface, Sequelize) {}
}
