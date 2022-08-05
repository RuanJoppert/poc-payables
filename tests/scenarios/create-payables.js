/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
import { connectionString, makePayable } from './helper.js'

const db = sql.open('postgres', connectionString)
const payable = makePayable({ updatedAt: '2022-08-06 22:35:32.389+00' })

const totalRows = 20 * 1000 * 1000

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
  db.close()
}

export default function () {
  db.exec(payable)
}
