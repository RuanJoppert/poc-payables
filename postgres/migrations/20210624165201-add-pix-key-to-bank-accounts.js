const tableName = 'BankAccounts'
const columName = 'pix_key'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columName, {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, columName)
  },
}
