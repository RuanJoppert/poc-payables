Feature: Trigger

Scenario: Insert into payables
  When I insert a new Payable
  Then it must be written also in Payables New

Scenario: Update into payables
  When I change a Payable
  Then it should also be changed in Payables New

Scenario: Discard update when payable is older
  When Payable has smaller updated_at
  When I change a Payable
  Then shouldn't change in Payables New
