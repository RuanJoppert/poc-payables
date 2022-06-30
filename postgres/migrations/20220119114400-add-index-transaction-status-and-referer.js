module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_transactions_status_referer ON "Transactions"
      USING btree (status, referer);
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ix_transactions_status_referer;
    `)
  },
}
