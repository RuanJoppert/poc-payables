const addEmvContactlessMobile = 'ALTER TYPE ' +
    'public."enum_MdrMethod_capture_method"' +
    'ADD VALUE \'tap_phone\''

const dropEmvContactlessMobile = 'ALTER TYPE ' +
    'public."enum_MdrMethod_capture_method"' +
    'DROP VALUE \'tap_phone\''

module.exports = {
  up: queryInterface => queryInterface
    .sequelize
    .query(addEmvContactlessMobile),

  down: queryInterface => queryInterface
    .sequelize
    .query(dropEmvContactlessMobile),
}
