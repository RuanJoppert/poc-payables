const typeName = 'enum_Settlements_type'
const newValue = 'provider_debit'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "${typeName}"
      ADD VALUE '${newValue}'
    `)
  },
  down () {},
}
