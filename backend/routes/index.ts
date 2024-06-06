import express, { Router , Request, Response, NextFunction} from 'express'

const indexRouter: Router = express.Router()
/* GET health status. */
/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Application Related API
 * /health:
 *   get:
 *     tags: [Application]
 *     summary: Health Check of Server
 *     description: Health Check of API Server
 *     responses:
 *       200:
 *         description: Status Okay
*/
indexRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
 return res.send({ status: 'success' })
})

export default indexRouter
