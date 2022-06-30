module.exports = {
  up (queryInterface) {
    return queryInterface.addIndex(
      'ReprocessedTransactions',
      ['company_id'],
      {
        name: 'ix_company_id',
        fields: ['company_id'],
      }
    )
  },
  down (queryInterface) {
    return queryInterface.removeIndex('ReprocessedTransactions', 'ix_company_id')
  },
}
