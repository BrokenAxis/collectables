import { createError } from '@fastify/error'

// Authentication errors -------------------------------------------------------

export const UnauthorizedError = createError('UnauthorizedError', 'Unauthorized: Authentication failed', 401)

export const InvalidIdError = createError('IdError', 'Unauthorized: User ID is either invalid or missing', 401)

export const AdminError = createError('AdminError', 'Unauthorized: User is not an admin', 401)

export const ManagerError = createError('ManagerError', 'Unauthorized: User is not a manager or admin', 401)

// Validation errors -----------------------------------------------------------

export const NotFoundError = createError('NotFoundError', 'Not found', 404)

export const throwNotUniqueError = (field: string) => {
  const err = createError('NotUniqueError', `${field} is already taken: ${field} must be unique`, 400)
  throw new err()
}

export const throwMissingFieldError = (field: string) => {
  const err = createError('MissingFieldError', `${field} is missing: ${field} is required`, 400)
  throw new err()
}

export const throwInvalidFieldError = (field: string, message: string) => {
  const err = createError('InvalidFieldError', `${field} is invalid: ${message}`, 400)
  throw new err()
}

// Error Wrapper ---------------------------------------------------------------

// Error wrapper for errors thrown by Prisma or other libraries
export const ErrorWrapper = (name: string, message: string | undefined) => {
  return createError(name, message || 'Error: Undefined stacktrace', 500)
}
