module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MdrConfiguration', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      anticipation_delay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down (queryInterface) {
    return queryInterface.dropTable('MdrConfiguration')
  },
}
