module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS payables_bulk_anticipation_id;
    `)
  },
  down () {
    return true
  },
}
