module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_RiskAnalyses_decision" ADD VALUE \'provider_error\'')
  },
  down () {},
}
