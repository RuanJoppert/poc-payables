module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      ui_order_id ON "Transactions"
      USING btree (order_id);
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ui_order_id;
    `)
  },
}
