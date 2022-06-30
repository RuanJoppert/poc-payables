const tableName = 'Anticipations'

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
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recipient_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['approved', 'canceled'],
        defaultValue: 'approved',
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['automatic'],
        defaultValue: 'automatic',
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      anticipation_fee: {
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
      .then(() => queryInterface.addIndex(
        tableName,
        ['company_id'],
        { fields: ['company_id'] }
      ))
      .then(() => queryInterface.addIndex(
        tableName,
        ['transaction_id'],
        { fields: ['transaction_id'] }
      ))
      .then(() => queryInterface.addIndex(
        tableName,
        ['recipient_id'],
        { fields: ['recipient_id'] }
      ))
      .then(() => queryInterface.addIndex(
        tableName,
        ['status'],
        { fields: ['status'] }
      ))
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
