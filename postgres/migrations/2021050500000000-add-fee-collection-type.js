module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'gateway_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'boleto_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'pix_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'iss_reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'deposit_reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'boleto_fraud';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'transaction_amount';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'add_balance';
    `))
  },

  down (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'gateway_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'boleto_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'pix_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'iss_reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'deposit_reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'boleto_fraud';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'transaction_amount';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'add_balance';
    `))
  },
}
