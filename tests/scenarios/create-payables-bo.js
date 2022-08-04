/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import sql from 'k6/x/sql'
import { scenario } from 'k6/execution'
import { sleep } from 'k6'
import { connectionString, updatePayableBatch } from './helper.js'

const db = sql.open('postgres', connectionString)

// const total = 5
// let initial = scenario.iterationInTest

// console.log('opa')

export const options = {
  scenarios: {
    pretest: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 200,
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
  const total = 5000
  const initial = (scenario.iterationInTest + 1) * total

  db.exec(updatePayableBatch(total, initial))

  sleep(5)
}
