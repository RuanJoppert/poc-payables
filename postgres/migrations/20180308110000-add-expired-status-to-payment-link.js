module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_PaymentLinks_status"
      ADD VALUE 'expired';
    `)
  },

  down () {},
}
