module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MdrInstallments', {
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  down (queryInterface) {
    return queryInterface.dropTable('MdrInstallments')
  },
}
