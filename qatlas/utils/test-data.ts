export const validCredentials = {
  username: 'standard_user',
  password: 'secret_sauce',
} as const;

export const invalidCredentials = {
  username: 'invalid_user',
  password: 'invalid_password',
} as const;

export const checkoutCustomer = {
  firstName: 'Test',
  lastName: 'Customer',
  postalCode: '10001',
} as const;
