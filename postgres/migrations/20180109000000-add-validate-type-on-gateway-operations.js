module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TYPE public."enum_GatewayOperations_type" ADD VALUE \'validate\';')
  },
  down () {},
}
