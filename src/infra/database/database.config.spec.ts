import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

describe('DatabaseConfig', () => {
  let service: DatabaseConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfig,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseConfig>(DatabaseConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTypeOrmOptions', () => {
    it('should return test configuration for NODE_ENV=test', () => {
      process.env.NODE_ENV = 'test';

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('mongodb');
      expect(result.database).toEqual(':memory:');
      expect(result.synchronize).toEqual(true);
    });

    it('should return production configuration for NODE_ENV=production', () => {
      process.env.NODE_ENV = 'production';

      jest
        .spyOn(service['configService'], 'get')
        .mockReturnValueOnce('production-value');

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('mongodb');
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });
});
