module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_payment_link_id ON "Orders"
      USING btree (payment_link_id)
    `)
  },

  down () { },
}

