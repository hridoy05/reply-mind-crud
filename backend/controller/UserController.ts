import { NextFunction, Request, Response } from 'express';
import {prisma} from '../prisma/prismaDB'
import jwt from 'jsonwebtoken'
import { BadRequestError, NotFoundError } from 'global-errors/error-handler';
import {hashSync, compareSync} from 'bcrypt';
import { JWT_SECRET } from '../secrets';



export const signup = async (req: Request, res:Response, next: NextFunction) => {
  const {email, password, name} = req.body;

  let user = await prisma.user.findFirst({where: {email}})
  if (user) {
     return new BadRequestError('User already exists!')
  }
  user = await prisma.user.create({
      data:{
          name,
          email,
          password: hashSync(password, 10)
      }
  })
  return res.json(user)
  
}

export const login = async (req: Request, res:Response) => {
  const {email, password} = req.body;

  let user = await prisma.user.findFirst({where: {email}})
  if (!user) {
      throw new NotFoundError('User not found.')
  }
  if(!compareSync(password, user.password)) {
      throw new BadRequestError('Incorrect password')
  }
  const token = jwt.sign({
      userId: user.id
  },JWT_SECRET)


  return res.json({user, token})
}

// Get info of currently loggedin user
async function getAuthenticatedUserInfo (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    })
   return res.json(user)
  } catch (err) {
    next(err)
  }
}
