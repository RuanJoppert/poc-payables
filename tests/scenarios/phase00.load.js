/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
import { connectionString, makePayable } from './helper.js'

const db = sql.open('postgres', connectionString)
const payable = makePayable({ updatedAt: '2021-10-10 22:35:32.389+00' })

const totalRows = 1 * 1000 * 1000

export const options = {
  scenarios: {
    pretest: {
      executor: 'shared-iterations',

      vus: 5,
      iterations: totalRows,
      maxDuration: '5h',
    },
  },
}

export function setup () {
}

export function teardown () {
  // const [payables] = sql.query(db, 'SELECT count(id) AS total FROM "Payables" ')
  // const [payablesNew] = sql.query(db, 'SELECT count(id) AS total FROM "PayablesNew" ')

  // check(payables, {
  //   'total rows (payables)': (res) => res.total === totalRows,
  // })

  // check(payablesNew, {
  //   'total rows (payablesNew)': (res) => res.total === 0,
  // })

  db.close()
}

export default function () {
  db.exec(payable)
}
