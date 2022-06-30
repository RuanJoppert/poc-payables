module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      ui_account_number ON "Recipients"
      USING btree (account_number);
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ui_account_number;
    `)
  },
}
