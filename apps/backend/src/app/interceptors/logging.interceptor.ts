import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { msToTime } from '../util/time'
import logger from '../../logger'

const shouldMute = (context: ExecutionContext) => {
  const { statusCode } = context.switchToHttp().getResponse()
  return context.getHandler().name === 'health'
}

@Injectable()
class LoggingInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const { body, method, url } = context.switchToHttp().getRequest()

    const trace = `${context.getClass().name}.${context.getHandler().name}`
    const { statusCode } = context.switchToHttp().getResponse()

    // get the req timestamp
    const reqTimestamp = new Date().getTime()

    return next.handle().pipe(
      tap((res) => {
        // get the res timestamp
        const resTimestamp = new Date().getTime()

        // calculate the time difference
        const timeDiff = resTimestamp - reqTimestamp

        const mute = shouldMute(context)

        const bodyStr =
          body && Object.keys(body).length ? JSON.stringify(body) : ''
        const bodyOut = bodyStr.length > 248 ? 'long body' : bodyStr

        if (!mute) {
          logger.debug(
            `[${method}] ${statusCode} (${msToTime(
              timeDiff,
            )}) ${url} ${trace} ${bodyOut}`,
          )
        }
      }),
    )
  }
}
