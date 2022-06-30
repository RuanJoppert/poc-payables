'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const readfile = Promise.promisify(fs.readFile)

const path = require('path')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() => loadSQLFile('extensions.sql'))
      // Begin creating tables
      .then(() => loadSQLFile('tables/addresses.sql'))
      .then(() => loadSQLFile('tables/antifraud_analyses.sql'))
      .then(() => loadSQLFile('tables/balance_histograms.sql'))
      .then(() => loadSQLFile('tables/balance_operations.sql'))
      .then(() => loadSQLFile('tables/balances.sql'))
      .then(() => loadSQLFile('tables/bank_accounts.sql'))
      .then(() => loadSQLFile('tables/boletos.sql'))
      .then(() => loadSQLFile('tables/bulk_anticipations.sql'))
      .then(() => loadSQLFile('tables/card_hashes.sql'))
      .then(() => loadSQLFile('tables/cards.sql'))
      .then(() => loadSQLFile('tables/chargebacks.sql'))
      .then(() => loadSQLFile('tables/customers.sql'))
      .then(() => loadSQLFile('tables/edi_files.sql'))
      .then(() => loadSQLFile('tables/eldorado_jobs.sql'))
      .then(() => loadSQLFile('tables/events.sql'))
      .then(() => loadSQLFile('tables/fee_collections.sql'))
      .then(() => loadSQLFile('tables/funding_balance_operations.sql'))
      .then(() => loadSQLFile('tables/funding_balances.sql'))
      .then(() => loadSQLFile('tables/funding_requests.sql'))
      .then(() => loadSQLFile('tables/gateway_operations.sql'))
      .then(() => loadSQLFile('tables/gateway_requests.sql'))
      .then(() => loadSQLFile('tables/gateway_tasks.sql'))
      .then(() => loadSQLFile('tables/invoices.sql'))
      .then(() => loadSQLFile('tables/payables.sql'))
      .then(() => loadSQLFile('tables/phones.sql'))
      .then(() => loadSQLFile('tables/plans.sql'))
      .then(() => loadSQLFile('tables/postback_deliveries.sql'))
      .then(() => loadSQLFile('tables/postback_operations.sql'))
      .then(() => loadSQLFile('tables/receivables.sql'))
      .then(() => loadSQLFile('tables/recipients.sql'))
      .then(() => loadSQLFile('tables/revenue_anticipations.sql'))
      .then(() => loadSQLFile('tables/revenue_withdrawals.sql'))
      .then(() => loadSQLFile('tables/revenues.sql'))
      .then(() => loadSQLFile('tables/security_rules.sql'))
      .then(() => loadSQLFile('tables/split_rules.sql'))
      .then(() => loadSQLFile('tables/subscriptions.sql'))
      .then(() => loadSQLFile('tables/transactions.sql'))
      .then(() => loadSQLFile('tables/transfers.sql'))
      // End creating tables
      // Begin creating Custom Types
      .then(() => loadSQLFile('models/balance/types/balance_entry.sql'))
      .then(() => loadSQLFile('models/balance/types/cached_balance_entry.sql'))
      .then(() => loadSQLFile('models/balance_operation/types/balance_operation_with_associations.sql'))
      .then(() => loadSQLFile('models/balance_operation/types/exported_balance_operation.sql'))
      .then(() => loadSQLFile('models/fee_collection/types/fee_collection_with_associations.sql'))
      .then(() => loadSQLFile('models/funding_balance/types/cached_funding_balance_entries.sql'))
      .then(() => loadSQLFile('models/payable/types/anticipable_limit.sql'))
      .then(() => loadSQLFile('models/payable/types/anticipable_payable.sql'))
      .then(() => loadSQLFile('models/payable/types/anticipable_performances.sql'))
      .then(() => loadSQLFile('models/payable/types/problematic_anticipable.sql'))
      .then(() => loadSQLFile('models/recipient/types/recipient_with_associations.sql'))
      .then(() => loadSQLFile('models/transfer/types/transfer_with_associations.sql'))
      // End creating Custom Types
      // Begin creating Stored Procedures
      .then(() => loadSQLFile('models/balance/functions/balance_calculate.sql'))
      .then(() => loadSQLFile('models/balance/functions/balance_operation_valid.sql'))
      .then(() => loadSQLFile('models/balance/functions/balances_refresh_balance.sql'))
      .then(() => loadSQLFile('models/balance/functions/cached_balance_table.sql'))
      .then(() => loadSQLFile('models/balance/functions/setup_balances.sql'))
      .then(() => loadSQLFile('models/balance_histogram/functions/cached_balance_histogram.sql'))
      .then(() => loadSQLFile('models/balance_operation/functions/associate_balance_operation.sql'))
      .then(() => loadSQLFile('models/balance_operation/functions/balance_operations_with_associations.sql'))
      .then(() => loadSQLFile('models/bank_account/functions/bank_accounts_with_associations.sql'))
      .then(() => loadSQLFile('models/fee_collection/functions/fee_collections_with_associations.sql'))
      .then(() => loadSQLFile('models/funding_balance/functions/cached_funding_balance_table.sql'))
      .then(() => loadSQLFile('models/funding_balance_operations/functions/fundingbalances_refresh_funding_balance.sql'))
      .then(() => loadSQLFile('models/invoice/functions/invoices_with_associations.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_from_payable.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables_filtered.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipable_payables_limits.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipation_company_performance.sql'))
      .then(() => loadSQLFile('models/payable/functions/anticipation_recipient_performance.sql'))
      .then(() => loadSQLFile('models/payable/functions/max_gross_amount_to_anticipate.sql'))
      .then(() => loadSQLFile('models/payable/functions/payables_with_associations.sql'))
      .then(() => loadSQLFile('models/payable/functions/problematic_anticipable_payables.sql'))
      .then(() => loadSQLFile('models/recipient/functions/balance_create_from_recipient.sql'))
      .then(() => loadSQLFile('models/recipient/functions/recipients_with_associations.sql'))
      .then(() => loadSQLFile('models/revenue/functions/versionable_update.sql'))
      .then(() => loadSQLFile('models/transfer/functions/transfers_with_associations.sql'))
      .then(() => loadSQLFile('util/functions/bo_status_to_varchar.sql'))
      .then(() => loadSQLFile('util/functions/enum_to_text.sql'))
      .then(() => loadSQLFile('util/functions/fn_triggerall.sql'))
      .then(() => loadSQLFile('util/functions/strip_all_triggers.sql'))
      .then(() => loadSQLFile('util/functions/time_to_date.sql'))
      .then(() => loadSQLFile('util/functions/varchar_to_int.sql'))
      // End creating Stored Procedures
      // Begin creating Lazy Indexes
      .then(() => loadSQLFile('tables/balance_operations_lazy_indexes.sql'))
      .then(() => loadSQLFile('tables/funding_balance_operations_lazy_indexes.sql'))
      // End creating Lazy Indexes
      // Begin creating Triggers
      .then(() => loadSQLFile('models/balance_operation/triggers/balances_refresh_balance_trigger.sql'))
      .then(() => loadSQLFile('models/funding_balance_operations/triggers/fundingbalances_refresh_funding_balance_trigger.sql'))
      .then(() => loadSQLFile('models/recipient/triggers/balance_create_from_recipient.sql'))
      .then(() => loadSQLFile('models/revenue/triggers/revenues_versionable_update.sql'))
      // End creating Triggers

    function loadSQLFile (filePath) {
      return readfile(`/code/postgres/migrations/sql/00000000000000-let-there-be-light/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down: function (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
