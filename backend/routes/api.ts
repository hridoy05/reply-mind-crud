import express from 'express'

const rootRouter = express.Router()

import userRouter from './v1/User'

rootRouter.use('/user' ,userRouter)

export default rootRouter