module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE anticipable_payable ADD ATTRIBUTE fraud_coverage_fee BIGINT;')
  },

  down (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE anticipable_payable DROP ATTRIBUTE fraud_coverage_fee;')
  },
}

