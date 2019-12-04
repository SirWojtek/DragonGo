import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ConfigKeyEnum, ConfigService } from '../services/config.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(configService: ConfigService) {
    const dsn = configService.get(ConfigKeyEnum.SENTRY_DSN) as string;
    const enabled: boolean = configService.get(
      ConfigKeyEnum.SENTRY_ENABLED,
    ) as boolean;

    Sentry.init({
      dsn,
      enabled,
      environment: process.env.NODE_ENV,
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // tslint:disable-next-line
    console.error(exception);

    Sentry.captureException(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status,
      success: false,
      data: {},
    });
  }
}
