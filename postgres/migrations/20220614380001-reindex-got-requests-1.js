module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "GameOfTransfersRequests_pkey";
    `)
  },
  down () {
    return true
  },
}
