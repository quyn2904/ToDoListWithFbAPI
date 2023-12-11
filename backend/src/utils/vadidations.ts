import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '../modules/errror/error.model'

// export ở ngoài xài đc hàm validate
//đổi thành RunnableValidationChains<ValidationChain>
//vì tý nữa validate sẽ đc xài thế này validate(checkShema({...}))
//mà checkShema() nó là(return) ra RunnableValidationChains<ValidationChain>
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req) //hàm tìm lỗi của middleware schema và đưa vào req

    const errors = validationResult(req) //funct này giúp ta lấy lỗi ra từ biến req
    // không lỗi thì next() để qua middleware tiếp theo
    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped() //hàm này giúp ta lấy lỗi ra dưới dạng object
    const entityError = new EntityError({ errors: {} }) //tạo object lỗi mặc định
    //xử lý object lỗi

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      //msg instanceof ErrorWithStatus thêm cho tường minh
      //và khi tường minh thì nó sẽ cho msg có  thể .status được
      //nếu có lỗi nào khác lỗi mặc định thì return(ngừng) và dồn lỗi cho default error handler xử lý
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      //nếu lỗi mặc định thì dồn lỗi vào entityError, nếu lỗi khác thì dồn lỗi vào errorObject
      //thông qua if ở trên
      entityError.errors[key] = errorObject[key]
    }

    next(entityError)
  }
}
