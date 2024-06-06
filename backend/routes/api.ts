import express from 'express'

const rootRouter = express.Router()

import orderRouter from '../routes/v1/Order'

rootRouter.use('/product' ,orderRouter)

export default rootRouter