const enumName = 'enum_ProviderDebits_status'
const newStatus = 'pending'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE '${newStatus}'`)
  },

  down () {},
}
