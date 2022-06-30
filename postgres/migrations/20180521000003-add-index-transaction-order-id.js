module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_order_id ON "Transactions"
      USING btree (order_id);
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ix_order_id;
    `)
  },
}
