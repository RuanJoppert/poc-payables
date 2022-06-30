module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS payables_status;
    `)
  },
  down () {
    return true
  },
}
