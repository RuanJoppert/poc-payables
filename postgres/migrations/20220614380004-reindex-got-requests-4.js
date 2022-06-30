module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "ix_created_at_requests";
    `)
  },
  down () {
    return true
  },
}
