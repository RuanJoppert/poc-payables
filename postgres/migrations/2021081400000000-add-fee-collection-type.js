module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    ADD VALUE 'insurance_ton';
    `))
  },

  down (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE public."enum_FeeCollections_type"
    DROP VALUE 'insurance_ton';
    `))
  },
}
