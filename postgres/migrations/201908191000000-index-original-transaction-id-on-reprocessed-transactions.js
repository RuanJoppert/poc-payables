module.exports = {
  up (queryInterface) {
    return queryInterface.addIndex(
      'ReprocessedTransactions',
      ['original_transaction_id'],
      {
        name: 'ix_original_transaction_id',
        fields: ['original_transaction_id'],
      }
    )
  },
  down (queryInterface) {
    return queryInterface.removeIndex('ReprocessedTransactions', 'ix_original_transaction_id')
  },
}
