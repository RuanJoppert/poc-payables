module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS payables_company_id;
    `)
  },
  down () {
    return true
  },
}
