module.exports = {
  up (queryInterface) {
    return queryInterface.addIndex(
      'ReprocessedTransactions',
      ['transaction_id'],
      {
        name: 'ix_transaction_id',
        fields: ['transaction_id'],
      }
    )
  },
  down (queryInterface) {
    return queryInterface.removeIndex('ReprocessedTransactions', 'ix_transaction_id')
  },
}
