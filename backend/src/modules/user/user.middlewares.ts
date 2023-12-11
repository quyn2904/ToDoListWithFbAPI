import { checkSchema } from 'express-validator'
import { validate } from '~/utils/vadidations'
import { USERS_MESSAGES } from './user.message'

export const registerValidation = validate(
  checkSchema(
    {
      fullname: {
        optional: false,
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: { min: 6, max: 30 },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      }
    },
    ['body']
  )
)
