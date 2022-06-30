module.exports = {
  up: function (queryInterface, Sequelize) {
    return runQuery(
      'CREATE INDEX CONCURRENTLY payables_batch_id ON "Payables" (batch_id);'
    )

    function runQuery (query) {
      return queryInterface.sequelize.query(query)
    }
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('Payables', 'payables_batch_id')
  }
}
