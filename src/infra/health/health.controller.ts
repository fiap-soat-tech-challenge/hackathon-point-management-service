import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.db.pingCheck('database')]);
  }
}
