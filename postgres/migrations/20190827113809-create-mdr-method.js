module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MdrMethods', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
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
      fee_preset_id: {
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
    return queryInterface.dropTable('MdrMethods')
  },
}
