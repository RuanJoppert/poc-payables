module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS ix_payables_status_prepaid;
    `)
  },
  down () {
    return true
  },
}
