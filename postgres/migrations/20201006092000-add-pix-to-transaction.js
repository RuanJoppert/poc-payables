module.exports = {
  up (queryInterface) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
    ALTER TYPE "enum_Transactions_payment_method"
    ADD VALUE 'pix';
    `))
  },
}
