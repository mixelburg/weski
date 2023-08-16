import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { NextFunction, Request, Response } from 'express'
import * as fs from 'fs'
import logger from './logger'
import { join } from 'path'

const sslFolder = process.env.SSL_FOLDER_PATH || '.'
const httpsConfig = fs.existsSync(join(sslFolder, '.cert/cert.pem'))
  ? {
      key: fs.readFileSync(join(sslFolder, '.cert/key.pem')),
      cert: fs.readFileSync(join(sslFolder, '.cert/cert.pem')),
    }
  : undefined

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: (origin, callback) => {
        callback(null, true)
      },
      credentials: true,
    },
    httpsOptions: httpsConfig,
  })
  const port = process.env.PORT || 3000
  const globalPrefix = 'api'

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    })
    next()
  })
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: false,
      parameterLimit: 50000,
    }),
  )
  app.use(cookieParser())
  app.setGlobalPrefix(globalPrefix)

  await app.listen(port, '0.0.0.0')

  const protocol = httpsConfig ? 'https' : 'http'

  logger.debug(
    `listening at ${protocol}://localhost:` + port + '/' + globalPrefix,
  )
}

bootstrap()
  .then(() => {
    logger.debug(`[+] server listening`)
  })
  .catch((err: any) => {
    console.error(err)
  })
