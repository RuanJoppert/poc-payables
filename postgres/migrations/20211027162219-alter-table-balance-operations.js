module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "BalanceOperations" ALTER COLUMN id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "BalanceOperations" ALTER COLUMN id TYPE integer;
    `)
  },
}
