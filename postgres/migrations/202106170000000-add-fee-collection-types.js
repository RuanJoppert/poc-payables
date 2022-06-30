module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'credit_retention';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'credit_disbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'credit_warranty';
    `))
  },

  down (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'credit_retention';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'credit_disbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'credit_warranty';
    `))
  },
}
