'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('FidcFiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['waiting_send', 'validated', 'sent_read', 'sent', 'failed_send'],
        defaultValue: 'waiting_send'
      },
      type: {
        type: Sequelize.ENUM,
        values: ['remessa', 'retorno', 'pay']
      },
      link_s3: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('FidcFiles')
  }
}
