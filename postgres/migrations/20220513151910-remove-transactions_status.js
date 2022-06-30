module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS transactions_status;
    `)
  },
  down () {
    return true
  },
}
