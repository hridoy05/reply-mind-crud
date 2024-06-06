import  { validationResult, ValidationError } from 'express-validator'
import express, { Request, Response, NextFunction} from 'express'
function throwIfError (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const arr = errors.array()
    var msg = "Invalid input on "
    arr.forEach((val: any) => {
      msg = msg + `${val.path}(in ${val.location}), `
    })
    msg = msg.slice(0, -2)
    return next({
      message: msg,
      status: 403
    })
  }

  return next()
}

export default throwIfError
