
module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_Payables_type" ADD VALUE \'unblock\'')
  },
  down () {},
}
