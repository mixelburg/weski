import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ExpressHttpExceptionFilter } from './filters/express-http-exception.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExpressHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
