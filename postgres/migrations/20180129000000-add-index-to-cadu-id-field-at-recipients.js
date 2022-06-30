module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(
      `CREATE INDEX CONCURRENTLY ix_cadu_id
      ON "Recipients"
      USING btree (cadu_id);`
    )
  },

  down (queryInterface) {
    return queryInterface.removeIndex('Recipients', 'ix_cadu_id')
  },
}
