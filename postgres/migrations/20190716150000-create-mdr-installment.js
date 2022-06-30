module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MdrInstallment', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      installment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mdr: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      mdr_method_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down (queryInterface) {
    return queryInterface.dropTable('MdrInstallment')
  },
}
