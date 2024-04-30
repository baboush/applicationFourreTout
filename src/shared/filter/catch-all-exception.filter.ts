import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CatchAllExceptionFilterFilter extends BaseExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    super.catch(exception, host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : 500;

    this.logger.error(
      `HTTP ${status} - ${exception.message}`,
      exception.stack,
      'AllExcptionFilter',
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
