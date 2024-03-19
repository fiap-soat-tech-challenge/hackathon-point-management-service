import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { RestExceptionFilter } from './rest-exception.filter';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';

describe('RestExceptionFilter', () => {
  let filter: RestExceptionFilter;
  let mockResponse: Response;
  let mockArgumentsHost: ArgumentsHost;

  beforeEach(() => {
    filter = new RestExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as ArgumentsHost;
  });

  it('deveria capturar e tratar DomainException', () => {
    const mockException = new NotFoundException('Test exception');

    filter.catch(mockException, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 404,
      message: 'Test exception',
    });
  });
});
