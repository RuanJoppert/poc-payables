module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS transfers_settlement_id;
    `)
  },
  down () {
    return true
  },
}
