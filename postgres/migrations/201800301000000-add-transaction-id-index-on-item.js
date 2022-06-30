module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(
      `CREATE INDEX CONCURRENTLY ix_items_transaction_id
      ON "Items"
      USING btree (transaction_id);`
    )
  },

  down (queryInterface) {
    return queryInterface.removeIndex('Items', 'items_transaction_id')
  },
}
