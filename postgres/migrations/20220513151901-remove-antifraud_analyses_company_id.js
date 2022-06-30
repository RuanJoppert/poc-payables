module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS antifraud_analyses_company_id;
    `)
  },
  down () {
    return true
  },
}
