import winston from 'winston';
import expressWinston from 'express-winston';

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
});

const errLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
        format: winston.format.simple(),
      }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});



export { logger, errLogger, };
