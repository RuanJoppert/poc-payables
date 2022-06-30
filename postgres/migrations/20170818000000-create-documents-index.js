module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE INDEX CONCURRENTLY IF NOT EXISTS documents_customer_id ON "Documents" USING btree (customer_id);')
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeIndex('Documents', 'documents_customer_id')
  }
}
