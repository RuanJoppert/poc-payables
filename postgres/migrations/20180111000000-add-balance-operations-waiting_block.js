module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_BalanceOperations_status" ADD VALUE \'waiting_block\'')
  },
  down () {},
}
