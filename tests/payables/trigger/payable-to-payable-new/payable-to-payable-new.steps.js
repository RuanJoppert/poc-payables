const { faker } = require('@faker-js/faker')
const { defineFeature, loadFeature } = require('jest-cucumber')
const { generateFakePayable } = require('../../../common/payables')
const container = require('../../../../src/container')

const feature = loadFeature('tests/payables/trigger/payable-to-payable-new/payable-to-payable-new.feature')

const { postgresQueryBuilder } = container.cradle

const updateAmountValue = 5000

let payableId
let payableData = generateFakePayable({ amount: 1000, updated_at: faker.date.past() })

defineFeature(feature, (test) => {
  test('Insert into payables', ({ when, then }) => {
    when('I insert a new Payable', async () => {
      const [payable] = await postgresQueryBuilder('Payables').insert(payableData).returning('*')

      payableData = payable
      payableId = payable.id

      expect(payable).toBeTruthy()
    })

    then('it must be written also in Payables New', async () => {
      const [payableNew] = await postgresQueryBuilder('PayablesNew').select('*').where({ id: payableId })
      const [payable] = await postgresQueryBuilder('Payables').select('*').where({ id: payableId })

      // bigint is 64-bit, and all 64-bit integers are returned by the underlying
      // node-postgres driver as type string, while 32-bit ones are returned as number
      payableNew.id = Number(payableNew.id)

      expect(payable).toStrictEqual(payableNew)
      expect(payableNew).toBeDefined()
    })
  })

  test('Update into payables', ({ when, then }) => {
    when('I change a Payable', async () => {
      const update = await postgresQueryBuilder('Payables').update({ amount: payableData.amount + updateAmountValue, updated_at: new Date() }).where({ id: payableId })

      expect(update).toBe(1)
    })

    then('it should also be changed in Payables New', async () => {
      const [payableNew] = await postgresQueryBuilder('PayablesNew').select('*').where({ id: payableId })

      expect(payableNew.amount).toBe(payableData.amount + updateAmountValue)
    })
  })

  test('Discard update when payable is older', ({ when, then }) => {
    const oldPayableData = generateFakePayable({ amount: 5000 })
    let oldPayableId

    when('Payable has smaller updated_at', async () => {
      const [payable] = await postgresQueryBuilder('Payables').insert(oldPayableData).returning('*')

      oldPayableId = payable.id

      expect(payable).toBeTruthy()
    })

    when('I change a Payable', async () => {
      const update = await postgresQueryBuilder('Payables').update({ amount: oldPayableData.amount + updateAmountValue, updated_at: faker.date.past() }).where({ id: oldPayableId })

      expect(update).toBe(1)
    })

    then('shouldn\'t change in Payables New', async () => {
      const [payable] = await postgresQueryBuilder('Payables').select('*').where({ id: oldPayableId })
      const [payableNew] = await postgresQueryBuilder('PayablesNew').select('*').where({ id: oldPayableId })

      expect(payable.amount).toBe(oldPayableData.amount + updateAmountValue)
      expect(payableNew.amount).toBe(oldPayableData.amount)
    })
  })
})

// afterAll(async () => postgresQueryBuilder.raw('TRUNCATE TABLE "Payables", "PayablesNew"'))
