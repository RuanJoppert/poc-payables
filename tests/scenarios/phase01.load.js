/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
// import { check } from 'k6'
import { connectionString, makePayable } from './helper.js'

const db = sql.open('postgres', connectionString)
const payable = makePayable({ updatedAt: '2022-10-10 22:35:32.389+00' })
// const dataSql = open('../scripts/duplicate_payable_to_payables_new.sql')

const totalRows = 1000 * 1000

export const options = {
  scenarios: {
    phase01: {
      executor: 'shared-iterations',

      vus: 5,
      iterations: totalRows,
      maxDuration: '10m',
    },
  },
}

export function setup () {
  db.exec('TRUNCATE TABLE "Payables", "PayablesNew"')
  // db.exec(dataSql)
}

export function teardown () {
  // const [payables] = sql.query(db, 'SELECT count(id) AS total FROM "Payables" ')
  // const [payablesNew] = sql.query(db, 'SELECT count(id) AS total FROM "PayablesNew" ')

  // check(payables, {
  //   'total rows (payables)': (res) => res.total === totalRows,
  // })

  // check(payablesNew, {
  //   'total rows (payablesNew)': (res) => res.total === totalRows,
  // })

  db.close()
}

export default function () {
  db.exec(payable)
}
