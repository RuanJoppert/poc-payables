const tableName = 'Plans'
const columnName = 'payment_deadline_charges_interval'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `ALTER TABLE "${tableName}"\
      ALTER COLUMN "${columnName}"
      SET DEFAULT 1`
    )
  },
  down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `ALTER TABLE "${tableName}"\
      ALTER COLUMN "${columnName}"
      DROP DEFAULT`
    )
  }
}
