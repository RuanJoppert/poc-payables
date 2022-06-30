const tableName = 'OnboardingAnswers'
const columnName = 'company_id'
const indexName = 'ix_company_id_onboarding_answers'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${columnName})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName};
    `)
  },
}
