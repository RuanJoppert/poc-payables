module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_Orders_status"
      ADD VALUE 'compromised';
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_Orders_status"
      DROP VALUE 'compromised';
    `)
  },
}
