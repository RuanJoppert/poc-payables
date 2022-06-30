module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS ix_split_rules_block_id;
    `)
  },
  down () {
    return true
  },
}
