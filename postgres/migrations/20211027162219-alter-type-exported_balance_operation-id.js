module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "exported_balance_operation" ALTER ATTRIBUTE id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "exported_balance_operation" ALTER ATTRIBUTE id TYPE integer;
    `)
  },
}
