module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      ADD VALUE 'deposit';
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FeeCollections_type"
      DROP VALUE 'deposit';
    `)
  },
}
