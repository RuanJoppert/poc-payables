module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_status_payment_link ON "PaymentLinks"
      USING btree (status)
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ix_status_payment_link
    `)
  },
}

