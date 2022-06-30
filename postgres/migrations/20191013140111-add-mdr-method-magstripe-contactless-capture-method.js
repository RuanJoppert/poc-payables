const addMagstripeContactless = 'ALTER TYPE ' +
    'public."enum_MdrMethod_capture_method"' +
    'ADD VALUE \'magstripe_contactless\''

const dropMagstripeContactless = 'ALTER TYPE ' +
    'public."enum_MdrMethod_capture_method"' +
    'DROP VALUE \'magstripe_contactless\''

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(addMagstripeContactless),

  down: queryInterface => queryInterface
    .sequelize.query(dropMagstripeContactless),
}
