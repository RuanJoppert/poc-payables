module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_Transactions_status"
      ADD VALUE 'pending_review';
    `)
  },

  down () {},
}
