
module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_Payables_status" ADD VALUE \'cancelled\'')
  },
  down () {},
}
