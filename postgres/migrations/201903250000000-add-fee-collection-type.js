module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'mdr_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'rav_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'gateway';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'consummation';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'withdrawal_charge';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'revenue_recognition';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'cashback';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'debt_payment';
    `))
  },

  down (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'mdr_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'rav_adjustment';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'reimbursement';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'gateway';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'consummation';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'withdrawal_charge';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'revenue_recognition';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'cashback';
    `))
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'debt_payment';
    `))
  },
}
