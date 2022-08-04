const { faker } = require('@faker-js/faker')
const { snakeCase } = require('./helper')

const generateStatus = (values) => {
  const arrayValues = values || [
    'waiting_funds',
    'confirmed',
    'prepaid',
    'paid',
    'suspended',
  ]

  return faker.helpers.arrayElement(arrayValues)
}

const generateFakePayable = (data) => ({
  status: generateStatus(),
  fee_status: generateStatus(),
  amount: faker.finance.amount(100, 10000, 0),
  fee: faker.datatype.number(400),
  anticipation_fee: null,
  fraud_coverage_fee: 0,
  installment: 1,
  company_id: snakeCase(faker.company.companyName()),
  payment_date: new Date(),
  fee_payment_date: new Date(),
  anticipation_fee_payment_date: new Date(),
  original_payment_date: null,
  type: 'credit',
  payment_method: 'credit_card',
  recipient_id: snakeCase(faker.company.companyName()),
  liquidation_engine: null,
  accrual_date: new Date(),
  anticipation_fee_base: 0,
  tax_fee: 0,
  anticipation_spread_amount: 0,
  is_anticipatable: true,
  split_rule_id: null,
  transaction_id: 1,
  document_number: faker.datatype.number({ min: 10000000000, max: 99999999999 }),
  document_type: 'cpf',

  created_at: new Date(),
  updated_at: new Date(),

  ...data,
})

module.exports = { generateFakePayable }
