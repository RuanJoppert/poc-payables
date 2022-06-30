module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE anticipable_limit ADD ATTRIBUTE maximum_fraud_coverage_fee BIGINT;
      ALTER TYPE anticipable_limit ADD ATTRIBUTE minimum_fraud_coverage_fee BIGINT;
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE anticipable_limit DROP ATTRIBUTE maximum_fraud_coverage_fee;
      ALTER TYPE anticipable_limit DROP ATTRIBUTE minimum_fraud_coverage_fee;
    `)
  },
}

