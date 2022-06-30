module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_riskanalyses_model_model_id ON "RiskAnalyses"
      USING btree (model, model_id);
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ix_riskanalyses_model_model_id;
    `)
  },
}
