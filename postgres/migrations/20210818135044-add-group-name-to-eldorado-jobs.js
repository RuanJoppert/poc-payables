const tableName = 'EldoradoJobs'
const columName = 'group_name'

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
