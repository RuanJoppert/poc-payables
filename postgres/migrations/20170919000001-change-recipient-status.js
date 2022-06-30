
module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE "enum_Recipients_status" ADD VALUE \'processing\'')
  },
  down () {},
}
