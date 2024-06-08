import express, { Express, urlencoded, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import compression from 'compression';
import HTTP_STATUS from 'http-status-codes';
import { errLogger } from './utils/logger'
import { CustomError, IErrorResponse } from './global-errors/error-handler';
import  swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './swagger.json'

//import router
import indexRouter from './routes/index'
import apiRouter from './routes/api'

const app: Express = express()
app.use(cors({
  origin: "*"
}))
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(urlencoded({ extended: true, limit: '50mb' }));
//rootRouter`
app.use('/health', indexRouter)
app.use('/api/v1', apiRouter)

// Set up Swagger
if(process.env.NODE_ENV !== 'production') {
    const swaggerOptions = {
      swaggerDefinition,
      // Paths to files containing OpenAPI definitions
      apis: ['./routes/*.ts', './routes/v1/*.ts', './routes/api/**/*.ts']
    }
    const openapiSpecification = swaggerJsdoc(swaggerOptions)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
      swaggerOptions: {
        persistAuthorization: true
      },
      explorer: true
    }))
  }

app.use('*', (req: Request, res: Response,  next: NextFunction) => {
   return res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
});

app.use(function (req, res, next) {
    return res.status(404).json({
      status: 404,
      message: "Not found"
    })
  })
app.use(errLogger)

app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
});

export default app;