const addEmvContactless = 'ALTER TYPE ' +
    'public."enum_Transactions_capture_method"' +
    'ADD VALUE \'emv_contactless\''

const dropEmvContactless = 'ALTER TYPE ' +
    'public."enum_Transactions_capture_method"' +
    'DROP VALUE \'emv_contactless\''

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(addEmvContactless),

  down: queryInterface => queryInterface.sequelize.query(dropEmvContactless),
}
