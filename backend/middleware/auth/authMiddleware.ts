import { NextFunction, Request, Response } from "express"

const jwt = require('jsonwebtoken')

function verifyToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization // Bearer TOKEN

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ message: 'Unauthorized Access' })

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err || !user) {
      return res.status(403).json({ message: 'Unauthorized Access' })
    }

    req.user = user
    return next()
  })
}

exports.verifyToken = verifyToken