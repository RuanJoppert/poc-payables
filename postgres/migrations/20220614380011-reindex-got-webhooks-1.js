module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "GameOfTransfersWebhooks_pkey";
    `)
  },
  down () {
    return true
  },
}
