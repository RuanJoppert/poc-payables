module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      REINDEX INDEX CONCURRENTLY "ix_gameoftransfers_webhooks_created_at_index";
    `)
  },
  down () {
    return true
  },
}
