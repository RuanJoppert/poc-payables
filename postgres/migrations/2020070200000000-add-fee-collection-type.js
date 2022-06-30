module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'payment_order';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'transfer_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'fraud_coverage_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'logistic_service';
    `))
  },

  down (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'payment_order';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'transfer_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'fraud_coverage_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'logistic_service';
    `))
  },
}
