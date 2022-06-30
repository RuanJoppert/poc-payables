const tableName = 'Orders'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['canceled', 'created', 'paid', 'returned'],
        allowNull: false,
        defaultValue: 'created',
      },
      amount: {
        type: Sequelize.INTEGER,
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
      .then(() => queryInterface.addIndex('Orders', ['company_id'], { fields: ['company_id'] }))
      .then(() => queryInterface.addIndex('Orders', ['status'], { fields: ['status'] }))
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
