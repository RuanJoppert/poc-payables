const tableName = 'Tep'

module.exports = {
  up (queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.STRING(56),
        primaryKey: true,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING(56),
      },
      payload: {
        type: DataTypes.JSON,
      },
      metadata: {
        type: DataTypes.JSON,
      },
      topic_name: {
        type: DataTypes.STRING(256),
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
