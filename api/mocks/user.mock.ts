export const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe5234@email.com',
  password: 'PJTjthaX2kSM8hvG',
}

export const invalidEmails = [
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Doe <email@example.com>',
  'email@example.com (Joe Doe)',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'email@example',
  'email@example..com',
  'Abc..123@example.com',
]

export const invalidPasswords = [
  '1234',
  'hallo123',
  'AD63KE8RE52DL834',
  '193"$874$§%)"=62',
]
