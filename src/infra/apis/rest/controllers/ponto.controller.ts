import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PontoUseCases } from '../../../../usecases/ponto.use.cases';
import { Ponto } from '../../../../domain/model/ponto';
import { PontoPresenter } from '../presenters/ponto.presenter';
import { PontoDto } from '../dtos/ponto.dto';
import { RelatorioDto } from '../dtos/relatorio.dto';

@ApiTags('Ponto')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/ponto')
export class PontoController {
  private readonly logger = new Logger(PontoController.name);
  private FUNCIONARIO_ID = '65fcb34a3746a1a6bbe927ea';
  constructor(private pontoUseCases: PontoUseCases) {}

  @ApiOperation({
    summary: 'Registra um novo ponto',
    description: 'Salva um novo registro de ponto no sistema',
  })
  @ApiCreatedResponse({
    type: PontoPresenter,
    description: 'Registro de ponto salvo com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post()
  async registro(@Body() pontoDto: PontoDto): Promise<PontoPresenter> {
    const ponto = await this.pontoUseCases.addPonto(
      this.FUNCIONARIO_ID,
      pontoDto.evento,
    );
    this.logger.log(`[Novo registro] ${pontoDto.evento} salvo com sucesso`);
    return new PontoPresenter(ponto, true);
  }

  @ApiOperation({
    summary: 'Visualiza os pontos registrados',
    description: 'Visualiza os pontos registrados no sistema',
  })
  @ApiOkResponse({
    type: PontoPresenter,
    description: 'Registros de ponto visualizados com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Get(':data')
  async visualiza(@Param('data') data: string): Promise<Array<PontoPresenter>> {
    const pontos: Array<Ponto> = await this.pontoUseCases.getAllPontosByData(
      data,
      this.FUNCIONARIO_ID,
    );
    return pontos.map((ponto) => new PontoPresenter(ponto, true));
  }

  /*
  Relatórios: O sistema deve ser capaz de gerar o espelho de ponto mensal com
  base nos registros de ponto do mês fechado (anterior) e
  enviar esse relatório por e-mail ao solicitante.
  (Listagem das datas, batimentos de ponto e total de horas trabalhadas)
   */
  @ApiOperation({
    summary: 'Gera e envia o relatório de registro de ponto mensal',
    description:
      'Gera relatório de registros de pontos realizados no mês e ano selecionado e envia por e-mail ao solicitante',
  })
  @ApiOkResponse({
    description: 'Relatório de registro de ponto gerado e enviado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @HttpCode(200)
  @Post('relatorio')
  async relatorio(@Body() relatorioDto: RelatorioDto): Promise<void> {
    await this.pontoUseCases.relatorioMensal(
      this.FUNCIONARIO_ID,
      relatorioDto.mes,
      relatorioDto.ano,
    );
  }
}
