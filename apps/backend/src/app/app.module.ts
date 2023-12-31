import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ExpressHttpExceptionFilter } from './filters/express-http-exception.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import {HotelsSimulatorModule} from "./integrations/hotels-simulator/hotels-simulator.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HotelsSimulatorModule
  ],
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
