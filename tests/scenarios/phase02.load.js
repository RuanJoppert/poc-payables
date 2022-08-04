/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
import { check } from 'k6'
import { connectionString, makePayable } from './helper.js'

const db = sql.open('postgres', connectionString)
const duplicatePayablesToPayablesNew = open('../scripts/duplicate_payable_to_payables_new.sql')

const payable = makePayable({ updatedAt: '2021-10-10 22:35:32.389+00' })
const totalRows = 10 * 1000

export const options = {
  scenarios: {
    createHistoricalPayables: {
      executor: 'shared-iterations',
      exec: 'createHistoricalPayables',
      vus: 5,
      iterations: totalRows,
      maxDuration: '10m',
    },

    activateTriggerDuplicate: {
      executor: 'shared-iterations',
      exec: 'activateTriggerDuplicate',
      vus: 1,
      iterations: 1,
      maxDuration: '1m',
      startTime: '1m',
    },

    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 50,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
    },
  },
}

export function setup () {
  db.exec('TRUNCATE TABLE "Payables", "PayablesNew"')
  // db.exec(duplicatePayablesToPayablesNew)
}

export function teardown () {
  const [payables] = sql.query(db, 'SELECT count(id) AS total FROM "Payables" ')
  const [payablesNew] = sql.query(db, 'SELECT count(id) AS total FROM "PayablesNew" ')

  check(payables, {
    'total rows (payables)': (res) => res.total === totalRows,
  })

  check(payablesNew, {
    'total rows (payablesNew)': (res) => res.total === totalRows,
  })

  db.close()
}

// ----------------------------------------------------------------------------

export function createHistoricalPayables () {
  db.exec(payable)
}

export function activateTriggerDuplicate () {
  db.exec(duplicatePayablesToPayablesNew)
}
