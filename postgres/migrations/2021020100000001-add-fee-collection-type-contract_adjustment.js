module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      ADD VALUE 'contract_adjustment';
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      DROP VALUE 'contract_adjustment';
    `)
  },
}
