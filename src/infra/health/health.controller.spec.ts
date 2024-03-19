import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckService,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [HealthCheckService, TypeOrmHealthIndicator],
    })
      .overrideProvider(HealthCheckService)
      .useValue({
        check: jest.fn().mockResolvedValue({}),
      })
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check result', async () => {
    const expectedResult = { database: { status: 'up' } } as any;
    jest
      .spyOn(module.get(HealthCheckService), 'check')
      .mockResolvedValueOnce(expectedResult);

    const result = await controller.check();

    expect(result).toEqual(expectedResult);
  });
});
