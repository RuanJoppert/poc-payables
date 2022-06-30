const tableName = 'Recipients'
const columName = 'pix_recipient_as_source'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columName, {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, columName)
  },
}
