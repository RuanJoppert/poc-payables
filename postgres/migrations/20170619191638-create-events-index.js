module.exports = {
  up: function (queryInterface, Sequelize) {
    return runQuery(
      'CREATE INDEX CONCURRENTLY events_company_id_model_internal_created_at ON "Events" (company_id, model, internal, created_at);'
    )

    function runQuery (query) {
      return queryInterface.sequelize.query(query)
    }
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('Events', 'events_company_id_model_internal_created_at')
  }
}
