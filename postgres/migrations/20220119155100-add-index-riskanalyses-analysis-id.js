module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ix_riskanalyses_analysis_id ON "RiskAnalyses"
      USING btree (analysis_id);
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ix_riskanalyses_analysis_id;
    `)
  },
}
