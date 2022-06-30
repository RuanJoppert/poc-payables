module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      ui_reference_key ON "Transactions"
      USING btree (company_id, reference_key);
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ui_reference_key;
    `)
  }
}
