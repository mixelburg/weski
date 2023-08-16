/* istanbul ignore file */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import logger from '../../logger';

export interface AppError {
  statusCode?: number
  error?: string
  message: string
  path?: string
  timestamp?: string
}

@Catch(HttpException)
export class ExpressHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const statusCode = exception.getStatus()

    const { message, error } = exception.getResponse() as {
      message: string
      error: string
    }

    const res: AppError = {
      statusCode,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    }

    logger.debug(
      `[${request.method}] ${statusCode} ${request.url} -> ${message}`,
    )

    response.status(statusCode).json(res)
  }
}
