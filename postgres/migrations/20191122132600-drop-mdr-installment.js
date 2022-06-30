module.exports = {
  up (queryInterface) {
    return queryInterface.dropTable('MdrInstallment')
  },
  down () {
    return null
  },
}
