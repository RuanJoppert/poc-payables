module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "ix_settlement_id_requests";
    `)
  },
  down () {
    return true
  },
}
