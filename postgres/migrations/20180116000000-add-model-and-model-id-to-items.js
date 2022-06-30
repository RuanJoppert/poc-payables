const tableName = 'Items'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      tableName,
      'model',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    )
      .then(() => queryInterface.addColumn(
        tableName,
        'model_id',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ))
      .then(() => queryInterface.sequelize.query(
        `CREATE INDEX CONCURRENTLY items_model_model_id
        ON "Items"
        USING btree (model, model_id);`
      ))
  },

  down (queryInterface) {
    return [
      queryInterface.removeColumn(tableName, 'model'),
      queryInterface.removeColumn(tableName, 'model_id'),
    ]
  },
}

