/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

// setup env
import { config } from 'dotenv'
import logger from './logger'
import { prisma } from './app/prisma/client';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.debug(
    `backend is running on: http://127.0.0.1:${port}/${globalPrefix}`,
  )

  for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, async () => {
      await prisma.$disconnect()
      await app.close()
      process.exit()
    })
  }
}

bootstrap()
