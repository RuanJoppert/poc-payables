const tableName = 'EldoradoJobs'
const columName = 'silent'

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
