CREATE TYPE anticipable_company_and_recipient_performance AS (
  company_performed_volume       bigint,
  company_non_performed_volume   bigint,
  company_total_volume           bigint,
  recipient_performed_volume     bigint,
  recipient_non_performed_volume bigint,
  recipient_total_volume         bigint
);
