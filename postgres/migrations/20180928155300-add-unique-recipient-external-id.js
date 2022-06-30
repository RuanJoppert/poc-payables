module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      ui_recipient_external_id ON "Recipients"
      USING btree (company_id, external_id);
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ui_recipient_external_id;
    `)
  },
}
