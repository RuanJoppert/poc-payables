module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS "balances_refresh_balance_trigger" ON "BalanceOperations";
    `)
  },
  down () {
    return Promise.resolve()
  },
}
