import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import userServices from './user.services'
import { registerReqBody } from './User.request'
import { USERS_MESSAGES } from './user.message'

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const { fullname } = req.body
  const result = await userServices.createUser(fullname)
  res.send({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    data: result
  })
}
