module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_Payables_liquidation_type"
      ADD VALUE 'contract';
    `)
  },

  down () {},
}
