import { createError } from '@fastify/error'

// Authentication errors -------------------------------------------------------

export const UnauthorizedError = createError(
  'UnauthorizedError',
  'Unauthorized: Authentication failed',
  401
)

export const InvalidIdError = createError(
  'IdError',
  'Unauthorized: User ID is either invalid or missing',
  401
)

export const AdminError = createError(
  'AdminError',
  'Unauthorized: User is not an admin',
  401
)

export const ManagerError = createError(
  'ManagerError',
  'Unauthorized: User is not a manager or admin',
  401
)

// Validation errors -----------------------------------------------------------

export const NotFoundError = createError('NotFoundError', 'Not found', 404)

export const NotUniqueError = (field: string) => {
  return createError(
    'NotUniqueError',
    `${field} is already taken: ${field} must be unique`,
    400
  )
}

export const MissingFieldError = (field: string) => {
  return createError(
    'MissingFieldError',
    `${field} is missing: ${field} is required`,
    400
  )
}

export const InvalidFieldError = (field: string, message: string) => {
  return createError(
    'InvalidFieldError',
    `${field} is invalid: ${message}`,
    400
  )
}
