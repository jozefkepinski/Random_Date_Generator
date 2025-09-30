Feature: Random Date Generator

  Scenario: Generate default set of random dates
    Given I am on the random date generator page
    When I click the generate button
    Then I should see at least 10 dates displayed

  Scenario: Validate format of generated dates
    Given I am on the random date generator page
    When I click the generate button
    Then each generated date should match the format "MM-DD-YYYY"

  Scenario: Regenerate dates and compare batches
    Given I am on the random date generator page
    When I click the generate button
    And I store the first batch of dates
    And I click the generate button again
    Then the new batch of dates should be different from the first batch

  Scenario Outline: Generate dates within a specific range
    Given I am on the random date generator page
    And I set start date to "<start>"
    And I set end date to "<end>"
    When I click the generate button
    Then all generated dates should be between "<start>" and "<end>"

    Examples:
      | start      | end        |
      | 01-01-2000 | 12-31-2010 |
      | 01-01-1990 | 12-31-1999 |

  Scenario: Negative case - missing end date
    Given I am on the random date generator page
    And I set start date to "01-01-2000"
    And I clear the end date field
    When I click the generate button
    Then I should see an error or no dates generated
