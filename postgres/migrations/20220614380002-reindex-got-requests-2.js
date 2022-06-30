module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "ix_stone_transfer_id_requests";
    `)
  },
  down () {
    return true
  },
}
