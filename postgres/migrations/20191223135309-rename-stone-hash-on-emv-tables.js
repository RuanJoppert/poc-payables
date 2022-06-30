const tableName = 'EmvTables'
const attrNameBefore = 'stone_hash'
const attrNameAfter = 'hash'

module.exports = {
  up (queryInterface) {
    return queryInterface.renameColumn(tableName, attrNameBefore, attrNameAfter)
  },

  down (queryInterface) {
    return queryInterface.renameColumn(tableName, attrNameAfter, attrNameBefore)
  },
}
