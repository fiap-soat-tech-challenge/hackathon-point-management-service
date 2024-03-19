import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainException } from '../../../../domain/exceptions/domain.exception';
import { Response } from 'express';

@Catch(DomainException)
export class RestExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
