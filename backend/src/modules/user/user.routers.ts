import { Router } from 'express'
import { registerValidation } from './user.middlewares'
import { wrapAsync } from '~/utils/handlers'
import { registerController } from './user.controllers'

const userRouter = Router()

userRouter.post('/register', registerValidation, wrapAsync(registerController))

export default userRouter
