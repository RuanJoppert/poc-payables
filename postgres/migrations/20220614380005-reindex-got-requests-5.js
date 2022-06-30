module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "ix_status_requests";
    `)
  },
  down () {
    return true
  },
}
