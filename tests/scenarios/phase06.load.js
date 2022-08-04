/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
import { check } from 'k6'
import { connectionString, makePayable, updateRandomPayable } from './helper.js'

const db = sql.open('postgres', connectionString)
const shift = open('../scripts/shift.sql')
const duplicatePayablesToPayablesNew = open('../scripts/duplicate_payable_to_payables_new.sql')
const duplicatePayablesToPayablesOld = open('../scripts/duplicate_payable_to_payables_old.sql')

const payable = makePayable({ updatedAt: '2021-10-10 22:35:32.389+00' })
const totalRows = 100 * 1000
const updateRows = 10 * 1000

export const options = {
  scenarios: {
    createPayables: {
      executor: 'shared-iterations',
      exec: 'createPayables',
      vus: 10,
      iterations: totalRows,
      maxDuration: '10m',
    },

    updatePayable: {
      executor: 'shared-iterations',
      exec: 'updatePayable',
      vus: 1,
      iterations: updateRows,
      maxDuration: '10m',
      startTime: '10s',
    },

    shiftTable: {
      executor: 'shared-iterations',
      exec: 'shiftTable',
      vus: 1,
      iterations: 1,
      maxDuration: '1m',
      startTime: '15s',
    },
  },
}

export function setup () {
  db.exec('TRUNCATE TABLE "Payables", "PayablesNew"')
  db.exec(duplicatePayablesToPayablesNew)
  db.exec(duplicatePayablesToPayablesOld)
}

export function teardown () {
  const [payables] = sql.query(db, 'SELECT count(id) AS total FROM "Payables" ')
  const [PayablesOld] = sql.query(db, 'SELECT count(id) AS total FROM "PayablesOld" ')
  const [payablesUpdated] = sql.query(db, 'SELECT count(id) AS total FROM "PayablesOld" WHERE fee_status = \'paid\' ')

  check(payables, {
    'total rows (payables)': (res) => res.total === totalRows,
  })

  check(PayablesOld, {
    'total rows (PayablesOld)': (res) => res.total === totalRows,
  })

  check(payablesUpdated, {
    'total rows (payablesUpdated)': (res) => res.total === updateRows,
  })

  db.close()
}

// ----------------------------------------------------------------------------

export function createPayables () {
  db.exec(payable)
}

export function updatePayable () {
  db.exec(updateRandomPayable)
}

export function shiftTable () {
  db.exec(shift)
}
