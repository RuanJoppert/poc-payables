module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS ix_is_anticipatable
      ON "Payables"
      USING btree (is_anticipatable);`
    )
  },

  down (queryInterface) {
    return queryInterface.removeIndex('Payables', 'ix_is_anticipatable')
  },
}
