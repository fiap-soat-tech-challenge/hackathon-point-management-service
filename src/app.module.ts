import { Module } from '@nestjs/common';
import { RestModule } from './infra/apis/rest/rest.module';
import { UseCasesProxyModule } from './infra/usecases-proxy/use-cases-proxy.module';
import { HealthModule } from './infra/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './infra/database/database.config';
import { RepositoriesModule } from './infra/repositories/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RestModule,
    RepositoriesModule,
    UseCasesProxyModule,
    HealthModule,
  ],
  providers: [DatabaseConfig],
})
export class AppModule {}
