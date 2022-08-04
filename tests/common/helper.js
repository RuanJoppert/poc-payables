const snakeCase = (string) => string.replace(/\W+/g, ' ')
  .split(/ |\B(?=[A-Z])/)
  .map((word) => word.toLowerCase())
  .join('_')

module.exports = { snakeCase }
