module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      transfers_ui_company_id_idempotency_key ON "Transfers"
      USING btree (company_id, idempotency_key);
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      transfers_ui_company_id_idempotency_key;
    `)
  },
}
