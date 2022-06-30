module.exports = {
  up (queryInterface) {
    return queryInterface.addIndex(
      'Terminals',
      ['name'],
      {
        name: 'ix_name_terminals',
        fields: ['name'],
      }
    )
  },
  down (queryInterface) {
    return queryInterface.removeIndex('Terminals', 'ix_name_terminals')
  },
}
