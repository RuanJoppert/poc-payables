module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "balance_operation_with_associations" ALTER ATTRIBUTE id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "balance_operation_with_associations" ALTER ATTRIBUTE id TYPE integer;
    `)
  },
}
