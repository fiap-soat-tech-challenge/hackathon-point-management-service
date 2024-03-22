import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RelatorioSenderServiceImpl } from './relatorio-sender.service.impl';

@Module({
  imports: [HttpModule],
  providers: [RelatorioSenderServiceImpl],
  exports: [RelatorioSenderServiceImpl],
})
export class ServicesModule {}
