import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapAsync =
  <P>(func: RequestHandler<P, any, any, any>) =>
  async (req: Request<P>, res: Response, next: NextFunction) => {
    //   Promise.resolve(func(req, res, next)).catch(next)
    //*lưu nhớ rằng *Promise resolve là 1 hàm trả về 1 promise
    //khi ta dùng hàm func trong promise.resolve
    //thì nó sẽ trả về 1 promise
    //nên ta có thể dùng catch để bắt lỗi nếu promise đó bị lỗi
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
