module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MdrMethod', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      anticipation_rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      card_brand: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.ENUM,
        values: ['credit_card', 'debit_card', 'boleto'],
        allowNull: true,
      },
      capture_method: {
        type: Sequelize.ENUM,
        values: ['ecommerce', 'emv', 'magstripe'],
        defaultValue: 'ecommerce',
        allowNull: true,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mdr_configuration_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down (queryInterface) {
    return queryInterface.dropTable('MdrMethod')
  },
}
