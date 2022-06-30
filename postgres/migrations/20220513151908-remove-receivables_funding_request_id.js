module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS receivables_funding_request_id;
    `)
  },
  down () {
    return true
  },
}
