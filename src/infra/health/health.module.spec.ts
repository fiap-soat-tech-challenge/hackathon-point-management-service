import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from './health.module';
import { HealthController } from './health.controller';

describe('HealthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule, HealthModule],
    }).compile();
  });

  it('should be defined', () => {
    const healthModule = module.get<HealthModule>(HealthModule);
    expect(healthModule).toBeDefined();
  });

  it('should provide HealthController', () => {
    const healthController = module.get<HealthController>(HealthController);
    expect(healthController).toBeDefined();
  });
});
