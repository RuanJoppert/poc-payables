module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      ADD VALUE 'cross_balance_adjustment';
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      DROP VALUE 'cross_balance_adjustment';
    `)
  },
}
