# Testing Guidelines

When writing tests, follow these key principles:

## Test Structure

- Name tests after the specific behavior being tested, not the method
- Write clear failure messages that explain what went wrong
- Test behaviors, not methods - a single method may require multiple tests

## Test Scope

- Always write the smallest test possible for the behavior being tested - this refers to minimizing the code being validated, not the code being executed
- It's acceptable to exercise a lot of code (e.g., a whole use case), but the specific behavior being validated should be small and focused

## Test Size

- Prefer small tests (single process) over medium (single machine) over large tests (distributed)
- Small tests should have no I/O operations, no sleeping, and no blocking calls

## Test Quality

- Make tests complete: include all information needed to understand how it arrives at its result
- Make tests concise: exclude distracting or irrelevant information
- Tests should be hermetic: assume as little as possible about the outside environment
- Tests should be obvious: contain only the information required to exercise the behavior, and contain no logic

## Test API Boundaries

- Test via public APIs, not via implementation details such as private methods
- Test state, not interactions - focus on what the result is, not how it was achieved
- The ideal test is unchanging - it should never change unless the requirements of the system under test change

## Test Logic and Sharing

- Don't put logic in tests - tests should be trivially correct upon inspection
- Follow DAMP (Descriptive And Meaningful Phrases) over DRY for test code
- Use shared setup appropriately for constructing objects under test
- Avoid harmful sharing: tests depending on specific values in shared setup
- Use helper methods that clearly define what's relevant for the test
